/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Changelogs(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>09.09.2019</h1>
          </header>
        </div>
        <h3>Twasi Docs #87</h3>
        <ul>
          <li>
            [User Docs] Added documentation for commands.
          </li>
        </ul>
        <br />
        <hr />
        <div className="post">
          <header className="postHeader">
            <h1>30.08.2019</h1>
          </header>
        </div>
        <h3>Twasi Docs #81</h3>
        <ul>
          <li>
            [User Docs] Added documentation for variables.
          </li>
        </ul>
        <br />
        <hr />
        <div className="post">
          <header className="postHeader">
            <h1>28.08.2019</h1>
          </header>
        </div>
        <h3>Twasi Panel #598</h3>
        <ul>
          <li>
            [Commands] Added a confirmation Dialog when trying to add a command that already exists.
          </li>
          <li>
            [Variables] Added a confirmation Dialog when trying to add a variable that already exists.
          </li>
        </ul>
        <h3>Twasi Docs</h3>
        <ul>
          <li>
            [Changelog] Added a dedicated changelog page.
          </li>
        </ul>
        <br />
        <hr />
        <div className="post">
          <header className="postHeader">
            <h1>26.08.2019</h1>
          </header>
        </div>
        <h3>Twasi Panel #593</h3>
        <ul>
          <li>
            [Commands, Variables, Supporttickets] Fixed issue with text encoding/decoding.
          </li>
        </ul>
      </Container>
    </div>
  );
}

module.exports = Changelogs;
