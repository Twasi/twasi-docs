/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div style={{ zIndex: '50', background: '#1a2035', color: '#afb6c5', height: 'calc(100vh - 50px)', position: 'relative' }} className="homeContainer">
        <div className="homeSplashFade">
          <div style={{ paddingTop: '150px' }} className="wrapper homeWrapper">{props.children}</div>
        </div>
        <div style={{ zIndex: '-2', width: '100%', height: '442px', backgroundImage: 'url(' + siteConfig.baseUrl + 'img/waves.svg)', backgroundRepeat: 'no-repeat', position: 'absolute', bottom: '0px', left: '0' }} />
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle" style={{ color: '#ffffff' }}>
        <img height="100" src={siteConfig.baseUrl + 'img/docs-logo.svg'} />
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a style={{ background: '#3f51b5', color: '#ffffff' }} className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('users/en/home.html')}>User Documentation</Button>
            <Button href={docUrl('home.html')}>Developer Documentation</Button>
          </PromoSection>
          <br />
          <p>
            Twasi is an open source Twitchbot. It is easy to use and the hosting is provided. It is built with a modular system.<br/>
            There are three main Components to Twasi, the <b>Twasi Core</b> wich is, like the Name points out, the Core Application of the Twasi Twitchbot.<br />
            The <b>Twasi Plugins</b> provide the Functionality of the Chatbot and the <b>Twasi Panel</b> wich acts as an UI for Userfriendly access to all the Functions of Twasi.
          </p>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const PluginsSection = () => (
      <Block id="try">
        {[
          {
            content:
              'To make Twasi stand out from other similar Projects we introduced **Twasi Plugins**.' +
              'With Twasi Plugins you can completely customize your personal instance of the Twasi Chatbot.' +
              'Another benefit with of a modular **Open Source** Project is that other Developers can contribute to Twasi to make it even better.<br/><br/>' +
              '[**Find out more**](https://github.com/Twasi)',
            image: `${baseUrl}img/undraw_status_update.svg`,
            imageAlign: 'left',
            title: 'Modular Structure',
          },
        ]}
      </Block>
    );

    const OpenSource = () => (
      <Block background="light">
        {[
          {
            content:
              'We want people to contribute to our work.<br/>'+
              'You can share your code, contribute with other developers and even share your plugins with the Twasi community.<br/>'+
              'There is no need to say that Open Source is the best way for us to go.<br/><br/>'+
              '[**Explore our GitHub page**](https://github.com/Twasi)',
            image: `${baseUrl}img/undraw_developer_activity.svg`,
            imageAlign: 'right',
            title: 'Open Source',
          },
        ]}
      </Block>
    );

    const TwasiAPISection = () => (
      <Block background="light">
        {[
          {
            content: 'We provide a **powerfull API** to use for your personal Project.<br/>' +
              'The API enables you, the developer to use data from streams tracked by Twasi to create wonderfull features for Twasi members to use in their channels.<br/>' +
              'There are a lot of usefull endpoints to choose from to bring your idea to Twasi.<br/><br/>' +
              '[**Find out more**](https://twasi.net)',
            image: `${baseUrl}img/undraw_code_typing.svg`,
            imageAlign: 'right',
            title: 'Powerfull API',
          },
        ]}
      </Block>
    );

    const ComponentsSection = () => (
      <Block className="headerColumns" layout="fourColumn">
        {[
          {
            content: 'Twasi Core is the Core Application of the Twasi Twitchbot. It hosts all the other plugins, manages the connection to the interface (Twitch IRC) and manages data persistence.<br/><br/>' +
            '[**Learn more**](https://github.com/Twasi)',
            //image: `${baseUrl}img/undraw_collecting.svg`,
            imageAlign: 'top',
            title: 'Twasi Core',
          },
          {
            content: 'Twasi itself does not provide many features to use in the Twitch chat. Instead it loads plugins that contain these features bundled in a .jar file.<br/><br/>' +
            //image: `${baseUrl}img/undraw_following.svg`,
            '[**Learn more**](https://github.com/Twasi)',
            imageAlign: 'top',
            title: 'Twasi Plugins',
          },
          {
            content: 'This is the management board for the Twitch Bot. You can control, enable, disable and manage plugins and Functions of the Bot here.<br/><br/>' +
            //image: `${baseUrl}img/undraw_charts.svg`,
            '[**Learn more**](https://github.com/Twasi)',
            imageAlign: 'top',
            title: 'Twasi Panel',
          },
        ]}
      </Block>
    );

    const SupportSection = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection">
          <h2>Need Help?</h2>
          <p>
            We want to provide the best Support possible.<br/>
            If you have anything to ask, just ask. Don't be shy.
          </p>
          <br />
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              Get Support
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div style={{ backgroundColor: '#4352af', color: '#ffffff' }}>
          <HomeSplash siteConfig={siteConfig} language={language} />
          <ComponentsSection />
        </div>
        <div className="mainContainer" style={{ paddingTop: '0px' }}>
          <TwasiAPISection />
          <PluginsSection />
          <OpenSource />
          <SupportSection />
        </div>
      </div>
    );
  }
}

module.exports = Index;
