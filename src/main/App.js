import React, {Component} from 'react';

import "bootswatch/dist/flatly/bootstrap.css";

import "../custom.min.css";

import "toastr/build/toastr.css";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Routes from "./Routes";
import Navbar from "../components/Navbar/Navbar";

import AuthProvider from "./AuthProvider";

export class App extends Component {
  render() {
      return (
          <>
              <AuthProvider>
                  <Navbar/>
                  <div className="container">
                      <Routes/>
                  </div>
              </AuthProvider>
          </>
      );
  }
}