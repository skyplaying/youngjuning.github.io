import React, { useContext, useState } from 'react';
import type { IRouteComponentProps } from '@umijs/types';
import {BackTop} from 'antd'
import { context, Link } from 'dumi/theme';
// import 'gitalk/dist/gitalk.css';
// import GitalkComponent from 'gitalk/dist/gitalk-component';
import shuffle from 'lodash.shuffle';
import Badge from './builtins/Badge'
import Alert from './builtins/Alert'
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import SlugList from './components/SlugList';
import SearchBar from './components/SearchBar';
import './style/layout.less';

const Hero = hero => (
  <>
    <div className="__dumi-default-layout-hero">
      {hero.image && <img src={hero.image} />}
      <h1>{hero.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: hero.desc }} />
      {hero.actions &&
        hero.actions.map(action => (
          <Link to={action.link} key={action.text}>
            <button type="button">{action.text}</button>
          </Link>
        ))}
    </div>
  </>
);

const Features = features => (
  <div className="__dumi-default-layout-features">
    {shuffle(features).map(feat => (
      <dl key={feat.title} style={{ backgroundImage: feat.icon ? `url(${feat.icon})` : undefined }}>
        {feat.link ? (
          <Link to={feat.link}>
            <dt>{feat.title}</dt>
          </Link>
        ) : (
          <dt>{feat.title}</dt>
        )}
        <dd dangerouslySetInnerHTML={{ __html: feat.desc }} />
      </dl>
    ))}
  </div>
);

const Layout: React.FC<IRouteComponentProps> = ({ children, location }) => {
  const {
    config: { mode, repository },
    meta,
    locale,
  } = useContext(context);
  const { url: repoUrl, branch, platform } = repository;
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);
  const isSiteMode = mode === 'site';
  const showHero = isSiteMode && meta.hero;
  const showFeatures = isSiteMode && meta.features;
  const showSideMenu = meta.sidemenu !== false && !showHero && !showFeatures && !meta.gapless;
  const showSlugs =
    !showHero &&
    !showFeatures &&
    Boolean(meta.slugs?.length) &&
    (meta.toc === 'content' || meta.toc === undefined) &&
    !meta.gapless;
  const isCN = /^zh|cn$/i.test(locale);
  const updatedTime: any = `${new Date(meta.updatedTime).toLocaleDateString([], { hour12: false })} ${new Date(meta.updatedTime).toLocaleTimeString([], { hour12: false })}`;
  const repoPlatform =
    { github: 'GitHub', gitlab: 'GitLab' }[
      (repoUrl || '').match(/(github|gitlab)/)?.[1] || 'nothing'
    ] || platform;

  return (
    <div
      className="__dumi-default-layout"
      data-route={location.pathname}
      data-show-sidemenu={String(showSideMenu)}
      data-show-slugs={String(showSlugs)}
      data-site-mode={isSiteMode}
      data-gapless={String(!!meta.gapless)}
      onClick={() => {
        if (menuCollapsed) return;
        setMenuCollapsed(true);
      }}
    >
      <Navbar
        location={location}
        navPrefix={<SearchBar />}
        onMobileMenuClick={ev => {
          setMenuCollapsed(val => !val);
          ev.stopPropagation();
        }}
      />
      <SideMenu mobileMenuCollapsed={menuCollapsed} location={location} />
      {showSlugs && <SlugList slugs={meta.slugs} className="__dumi-default-layout-toc" />}
      {showHero && Hero(meta.hero)}
      {showFeatures && Features(meta.features)}
      <div className="__dumi-default-layout-content">
        <div style={{marginBottom: '16px', display: 'flex', justifyContent: 'center'}}>
        {
          meta.tags?.map(item => <Badge key={item}>{item}</Badge>)
        }
        </div>
        <div style={{display: 'flex',justifyContent: 'center'}}>
          <img src={meta.cover} width="70%"/>
        </div>
        {children}
        {/* {location.pathname.indexOf('friends') >= 0 && (
          <div className="__dumi-default-layout-comment">
            <GitalkComponent
              options={{
                clientID: 'a6e0d6a84dbf93dd00f3',
                clientSecret: '0c9c5fff9e132c7e85ccc08633629706acfc33e4',
                repo: 'youngjuning.github.io',
                owner: 'youngjuning',
                admin: ['youngjuning'],
                title: meta.title
              }}
            />
          </div>
        )} */}
        {!showHero && !showFeatures && meta.filePath && !meta.gapless && (
          <div className="__dumi-default-layout-footer-meta">
            {repoPlatform && (
              <Link to={`${repoUrl}/edit/${branch}/${meta.filePath}`}>
                {isCN ? `在 ${repoPlatform} 上编辑此页` : `Edit this doc on ${repoPlatform}`}
              </Link>
            )}
            <span data-updated-text={isCN ? '最后更新时间：' : 'Last update: '}>{updatedTime}</span>
          </div>
        )}
        {(showHero || showFeatures) && meta.footer && (
          <div
            className="__dumi-default-layout-footer"
            dangerouslySetInnerHTML={{ __html: meta.footer }}
          />
        )}
      </div>
      <BackTop />
    </div>
  );
};

export default Layout;
