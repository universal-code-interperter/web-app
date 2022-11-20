import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React from 'react'

export default function Home() {
  return (
    <>
<Head>

<meta httpEquiv="content-type" content="text/html" charSet="utf-8" />
<link rel="StyleSheet" href="frame_1.css" />
<title>Project</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
</Head>
<div id="content-container">
<div id="_bg__frame_1" />
<div id="rectangle_1" />
<img src="skins/rectangle_2.jpg" id="rectangle_2" />
<img src="skins/polygon_1.jpg" id="polygon_1" />
<div id="content">
  <div id="btn">
    <div id="rectangle_2_ek1" />
    <div id="start">START</div>
  </div>
  <div id="press_start_to_begin_coding">Press start to begin coding</div>
  <div id="welcome">WELCOME</div>
</div>
<img src="/skins/uci_logo2_1.jpg" id="uci_logo2_1" />
<div id="about_hack_the_change">
  <span style={{ fontStyle: "normal", fontWeight: "normal" }}>About</span>
  <span style={{ fontStyle: "normal", fontWeight: "normal" }}> </span>
  <span style={{ fontStyle: "normal", fontWeight: "normal" }}>
    Hack The Change
  </span>
  <span style={{ fontStyle: "normal", fontWeight: "normal" }}> </span>
</div>
</div>
 </>   
  );
}
