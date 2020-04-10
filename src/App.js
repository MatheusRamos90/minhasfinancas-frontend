import React, { Component } from 'react';
import "bootswatch/dist/flatly/bootstrap.css";
import "./custom.min.css";
import {Login} from "./views/login";

export class App extends Component {
  render() {
      return (
          <>
              <Login/>
          </>
      );
  }
}