// eslint-disable-next-line import/no-unresolved
import { globalHistory } from '@reach/router';
import {
  Affix, Layout, Row, Col, List, Divider,
} from 'antd';
import React, { useRef } from 'react';

import { useWindowSize, useSiteMetadata } from '../../../utils/hooks';
import Utils from '../../../utils/pageUtils';
import Icon from '../../Icon';
import LoadableTableOfContents from '../../TableOfContents/loadable';

import * as style from './sidebar.module.less';

const { Content } = Layout;

const Name = () => {
  const siteMetadata = useSiteMetadata();
  const arr = siteMetadata.author.split(' ');
  const firstName = arr.slice(0, arr.length - 1)
    .join(' ');
  const lastName = arr[arr.length - 1];
  return (
    <Row>
      <Col xs={24}>
        <h2 className="centerAlign">
          {firstName}
          &nbsp;
          <span>{lastName}</span>
        </h2>
      </Col>
      {siteMetadata.authorAlternative ? (
        <Col
          xs={24}
          style={{
            marginTop: '-1rem',
            marginBottom: '-1rem',
          }}
        >
          <h3 className="centerAlign">{siteMetadata.authorAlternative}</h3>
        </Col>
      ) : null}
    </Row>
  );
};

const UserInfo = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <>
      <div className={`${style.name} centerAlign`}>
        <Row>
          {siteMetadata.professions.map((profession) => (
            <Col
              key={profession}
              xs={24}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <span className={`${style.badge} ${style.badgeGray}`}>{profession}</span>
            </Col>
          ))}
        </Row>
        <div className="centerAlign box" style={{ marginTop: '0.5rem' }}>
          <Row gutter={[10, 0]}>
            {siteMetadata.social.map((social) => (
              <Col key={social.url}>
                <a
                  href={social.url}
                  target="_blank"
                  label="button"
                  rel="noopener noreferrer"
                >
                  <Icon size="lg" fixedWidth icon={social.icon} />
                </a>
              </Col>
            ))}
          </Row>
        </div>
        <List
          itemLayout="horizontal"
          split={false}
          style={{
            width: '200px',
            marginBottom: '-0.5rem',
          }}
          grid={{ gutter: 0 }}
        >
          {siteMetadata.birthday
            ? (
              <List.Item>
                <List.Item.Meta
                  avatar={<Icon size="lg" fixedWidth icon="calendar" />}
                  title={siteMetadata.birthday}
                />
              </List.Item>
            ) : null}
          {siteMetadata.location
            ? (
              <List.Item>
                <List.Item.Meta
                  avatar={<Icon size="lg" fixedWidth icon="map-marker-alt" />}
                  title={siteMetadata.location}
                />
              </List.Item>
            ) : null}
          {siteMetadata.email
            ? (
              <List.Item>
                <List.Item.Meta
                  avatar={<Icon size="lg" fixedWidth icon="envelope" />}
                  title={<a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>}
                />
              </List.Item>
            ) : null}
          {siteMetadata.language
            ? (
              <List.Item>
                <List.Item.Meta
                  avatar={<Icon size="lg" fixedWidth icon="language" />}
                  title={siteMetadata.language}
                />
              </List.Item>
            ) : null}
        </List>
      </div>
    </>
  );
};

const DomContent = (props) => {
  const { tableOfContents } = props;
  const siteMetadata = useSiteMetadata();
  const mainSidebar = useRef(null);
  return (
    <aside>
      <div ref={mainSidebar}>
        <img
          className={`${style.profileAvatar} centerAlign`}
          src={Utils.generateFullUrl(siteMetadata, siteMetadata.avatar)}
          alt=""
        />
        <div className={`${style.name} ${style.boxName} centerAlign`}>
          <Name />
        </div>
        <UserInfo />
      </div>
      {tableOfContents
        ? (
          <>
            <Divider />
            <LoadableTableOfContents tableOfContents={tableOfContents} mainSidebar={mainSidebar} />
          </>
        ) : null}
      {/* <div className={style.resumeDownload}> */}
      {/*  <a href="../resume.pdf" target="_blank">Download CV</a> */}
      {/* </div> */}
    </aside>
  );
};

const Sidebar = (props) => {
  const [width] = useWindowSize();
  const {
    children,
    tableOfContents,
  } = props;
  const { pathname } = globalHistory.location;
  let domContent = <DomContent tableOfContents={tableOfContents} />;
  if (width > 997) {
    domContent = (
      <Affix offsetTop={0}>
        <DomContent tableOfContents={tableOfContents} />
      </Affix>
    );
  }
  if (width < 768) {
    domContent = <></>;
    if (pathname === '/') {
      domContent = <DomContent tableOfContents={tableOfContents} />;
    }
  }
  return (
    <>
      <Layout>
        <Content className={`${style.content} ${style.background}`}>
          <Row style={{ marginBottom: '4rem' }}>
            <Col sm={24} md={10} lg={7} className={style.sidebarContent}>
              {domContent}
            </Col>
            <Col sm={24} md={14} lg={17}>
              <Layout className={`${style.background} ${style.boxContent} borderRadiusSection`}>
                {children}
              </Layout>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export const Sidebar404 = (props) => {
  const { children } = props;
  return (
    <Layout>
      <Content className={`${style.content} ${style.background} `}>
        <Row>
          <Col sm={24} md={24} lg={24}>
            <Layout className={`${style.background} ${style.boxContent} ${style.sideBar404Radius}`}>
              {children}
            </Layout>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Sidebar;
