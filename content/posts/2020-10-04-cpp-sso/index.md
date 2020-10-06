---
title: "C++ Small String Optimization"
tags: ["cpp"]
date: 2020-10-04
path: "posts/cpp-sso"
excerpt: In this post, SSO (small string optimization) in C++ is studied and some more efforts for small static strings are made.
---

## Implementation of `std::string`

### `g++`

In `g++` (libstdc++) implementation, Assuming a 64-bit OS, the class structure (with the size of each attribute) can be simplified as:

```cpp
template<typename value_type>
class basic_string {
    enum { __min_cap = 15 / sizeof(value_type) };

    pointer   __data_;                     //  8 bytes
    size_type __size_;                     //  8 bytes

    union {
        value_type __data_[__min_cap + 1]; // 16 bytes
        size_type  __cap_;                 //  8 bytes
    } __u_;                                // 16 bytes
};                                         // 32 bytes
```

The capacity (`size_type`, 8 bytes) is combined with a char array in a union if the string length is less than local capacity.

The template argument `value_type` is define to support both `char` and `wchar_t`.

+ `basic_string<char>` has a local capacity of 15.
+ `basic_string<wchar_t>` has a local capacity of 7.
+ we need one more char to store `\0`.

<br />

Both of them have a total size of 32 bytes. The size of the char array is 16 bytes, because in `g++`, a minimum block allocated by dynamic memory allocation (malloc/new) is 16 bytes (so less than 16 bytes is not a good optimization).

You may notice that there exists an overhead of 8 bytes in the union. This is ignorable if you do not need to store huge amounts of small strings in memory.

### `llvm/clang`

In `llvm/clang` (libc++) implementation, the overhead can be cancelled by a smarter design: using the entire structure to store the small string.

We define two modes for each string: long string mode and short string mode, each in a separate struct, and then combine them together with a union.

```cpp
template<typename value_type>
class basic_string {
    struct __long {
        size_type __cap_;               // 8      bytes
        size_type __size_;              // 8      bytes
        pointer   __data_;              // 8      bytes
    };

    enum {__min_cap = (sizeof(__long) - 1) / sizeof(value_type) > 2 ?
                      (sizeof(__long) - 1) / sizeof(value_type) : 2};

    struct __short {
        union {
            unsigned char __size_;      // 1      byte
            value_type __lx;            // 1 (2)  bytes for char(wchar_t)
        };                              // 1 (2)  bytes for char(wchar_t)
        value_type __data_[__min_cap];  // 23(22) bytes for char(wchar_t)
    };                                  // 24     bytes

    union {
        __long  __l;                    // 24     bytes
        __short __s;                    // 24     bytes
    } __r_;                             // 24     bytes
}

```

In short string mode, the first byte of the string stores the size (which is less than 24). The rest bytes store the string locally. The variable `__lx` is used for alignment with `wchar_t`.

In order to distinguish a long string from a short one, the first byte of a long string (also the first byte of its capacity) is set to a mask 0x80 (which is larger than the maximum length of short string). This mask actually half the maximum capacity of the long string, but 0x 7fff ffff ffff ffff is huge enough comparing to achievable memory size.

This design eliminates the size of a string to 24 bytes, and provides a longer local string (15 -> 22 for `char`, or 7 -> 10 for `wchar_t`).

