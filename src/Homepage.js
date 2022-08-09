/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";

import logo from "./assets/Alpha-Logo-white.png";
import logoVlt from "./assets/logobuy.png";
import bgImg from "./assets/earth.svg";
import { useNavigate } from "react-router-dom";
import Carousel from "carousel-react-rcdev";
import cardicon1 from "./assets/cardicon1.png";
import cardicon2 from "./assets/cardicon2.png";
import cardicon3 from "./assets/cardicon3.png";
import pancakeswap from "./assets/pancakesswap.png";
import side1 from "./assets/side1.png";
import side2 from "./assets/side2.png";
import bnb from "./assets/binance.png";
import RoadmapPc from "./assets/desk.png";
import RoadmapMobile from "./assets/roadmap-02.svg";
import keeToken from "./assets/keetoken.png";
import side3 from "./assets/side3.png";
import Swal from "sweetalert2";
import bgImg2 from "./assets/banner_vector3.png";
import CoinMoon from "./assets/coinmooner.png";
import CoinGecko from "./assets/coingekco.png";
import Coinod from "./assets/Coinsgods.png";
import CoinScope from "./assets/coinscope.png";
import CoinMarket from "./assets/Coinmarketcap01.png";
import { connect } from "react-redux";
import { ConnectMetamask, DisconnectWallet, web3_ } from "./Services/index";
import { ConnectWeb3Wallet } from "./Services";
// Create a connector

import "./App.css";
import { useEffect, useState } from "react";

import { busdContract, cyberICO, ico } from "./Config/Contract/ICO_Contract";
import Spinner from "react-spinkit";
import { busdAbi } from "./Config/ABI/busdABI";
import { icoAbi } from "./Config/ABI/ICO_ABI";
import { store } from "./Redux/store";
import { ProgressBar } from "react-bootstrap";
import CounterComponent from "./Components/Counter";
import Footer from "./Components/Footer";
import Footer2 from "./Components/Footer2";
import Carosual from "./Components/Carosual";
import axios from "axios";
import ScrollToTop from "./Components/ScrollToTop";
function HomePage(props) {
  const [connect, setConnect] = useState(false);
  const navigate = useNavigate();
  const [sale, setSale] = useState(true);
  const [tokenData, setTokenData] = useState("");
  const [whitelisted, setWhitelisted] = useState(false);
  const [cyberIcoOver, setCyberIcoOver] = useState(false);
  const [isApprovedBuy, setIsApprovedBuy] = useState(true);
  const [detailsCyber, setDetailsCyber] = useState("");
  const [apprcyber, setCyberAppr] = useState(false);
  const [details, setDetails] = useState([]);
  const [token, setToken] = useState("");
  const [spinnerAppr, setSpinnerAppr] = useState(false);
  const [kees, setKees] = useState("");
  const [spinnerBuy, setSpinnerBuy] = useState(false);
  const [addApprove, setAddAppr] = useState("");
  const [switchIco, setSwitchIco] = useState("No");
  const [inputDisable, setInputDisable] = useState(false);

  const [counter, setCounter] = useState(0);
  const [isApproved, setIsApproved] = useState(true);
  const [error, setError] = useState("");

  useEffect(async () => {
    console.log("New Address ", props.metamaskAddress);
    localStorage.setItem("Address", props.metamaskAddress);

    if (!isApproved) {
      DisconnectWallet();
      setToken("");
      setIsApproved(true);

      setKees("");
    }
    if (props.metamaskAddress != "") {
      if (counter > 0) {
      } else {
        let contract = await new web3_.eth.Contract(icoAbi, ico).methods;
        const res = await contract.getTokenomics().call();
        console.log(res, "response");
        let cyberContract = await new web3_.eth.Contract(icoAbi, cyberICO)
          .methods;
        console.log(cyberContract);
        const TokenomicsCyber = await cyberContract.getTokenomics().call();
        console.log(TokenomicsCyber, "response");
        setDetailsCyber(TokenomicsCyber);
        setConnect(true);
        axios
          .post("https://cybervoyce.herokuapp.com/verify", {
            Address: [props.metamaskAddress],
          })
          .then(function (response) {
            console.log(response.data, "in this console yeh yoooo");
            if (response.data.Result == "true") {
              console.log("in this true one", response.data);
              setWhitelisted(true);
            } else {
              console.log("in this false one", response.data.Result);
              setWhitelisted(false);
            }
          })
          .catch((err) => {
            setWhitelisted(false);
            console.log(err.message, "in this console yeh yoooo");
          });

        setDetails(res);
        const icoOver = await contract.isIcoOver().call();
        const cyberIcoOver = await cyberContract.isIcoOver().call();

        alert(cyberIcoOver);
        setSale(icoOver);
        console.log("ico khatam", icoOver);
        setDetails(res);
        setTokenData(contract.showAllTrade().call());
        setCounter(counter + 1);
      }
    }
  }, [props.metamaskAddress]);

  async function handleClick() {
    if (window.ethereum) {
      await ConnectMetamask();
      console.log("yess");

      setConnect(true);
      setIsApprovedBuy(true);
    } else {
      DisconnectWallet();
      await ConnectWeb3Wallet();

      setIsApprovedBuy(true);
    }
  }

  async function handleChange(e) {
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    if (isNumeric(e.target.value)) {
      setError("");
      setToken(e.target.value);
      if (switchIco == "cyber") {
        setKees(
          e.target.value /
            parseFloat(detailsCyber[2] / Math.pow(10, 18)).toFixed(4)
        );
      } else {
        setKees(
          e.target.value / parseFloat(details[2] / Math.pow(10, 18)).toFixed(4)
        );
      }
    } else {
      setKees("");
      setError("Please Enter Numbers In Input");
      setToken("");
      return;
    }
  }

  async function handleApprove() {
    setCyberAppr(true);
    if (!connect) {
      Swal.fire("Please connect Metamask");
      setToken("");
      setKees("");
      setIsApproved(true);
      setIsApprovedBuy(true);
    } else {
      if (token === "0" || token === "0.0") {
        setError("Please Enter Value Greater Then 0");
        setToken("");
        setToken("");
        setKees("");
        setIsApproved(true);
        setIsApprovedBuy(true);
      } else if (
        details &&
        details[3] > Math.floor(new Date().getTime() / 1000.0)
      ) {
        Swal.fire(
          `Investment will start from ${moment
            .unix(details[3])
            .format("DD/MM/YYYY")}`
        );
        setToken("");
        setKees("");
        setInputDisable(false);
        setIsApproved(true);
        setIsApprovedBuy(true);
        setSpinnerAppr(false);
        setSpinnerBuy(false);
      } else {
        setSpinnerAppr(true);
        let res = await new web3_.eth.Contract(busdAbi, busdContract).methods
          .balanceOf(props.metamaskAddress)
          .call();

        console.log(res / Math.pow(10, 18), token);
        let addAppr = store.getState().ConnectivityReducer.metamaskAddress;
        setAddAppr(addAppr);

        const tkn = web3_.utils.toWei(token.toString(), "ether");

        console.log(res / Math.pow(10, 18) < parseFloat(token));
        if (res / Math.pow(10, 18) > parseFloat(token)) {
          await new web3_.eth.Contract(busdAbi, busdContract).methods
            .approve(ico, tkn)
            .send({
              from: props.metamaskAddress,
            })
            .on("transactionHash", function (transactionHash) {
              console.log(transactionHash);
            })
            .on("confirmation", () => {})
            // get New Contract Address
            .then(async (res) => {
              Swal.fire("Transaction Successful", "", "success");
              setIsApproved(false);
              setInputDisable(true);
              setSpinnerAppr(false);
              setIsApprovedBuy(false);
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                "Transaction Failed",
                "Please Try After Some Time",
                "error"
              );
              setToken("");
              setKees("");
              setIsApproved(true);
              setSpinnerAppr(false);
            });
        } else {
          Swal.fire(
            `Please Enter Atleast ${token} BUSD In Your Account To Intiate This Transaction.`
          );
          setToken("");
          setKees("");
          setIsApproved(true);
          setIsApprovedBuy(true);
          setSpinnerAppr(false);
        }
      }
    }
  }
  async function handleApproveCyber() {
    setCyberAppr(true);
    if (!connect) {
      Swal.fire("Please connect Metamask");
      setToken("");
      setKees("");
      setIsApproved(true);
      setIsApprovedBuy(true);
    } else {
      if (token === "0" || token === "0.0") {
        setError("Please Enter Value Greater Then 0");
        setToken("");
        setToken("");
        setKees("");
        setIsApproved(true);
        setIsApprovedBuy(true);
      } else if (
        detailsCyber &&
        detailsCyber[3] > Math.floor(new Date().getTime() / 1000.0)
      ) {
        Swal.fire(
          `Investment will start from ${moment
            .unix(details[3])
            .format("DD/MM/YYYY")}`
        );
        setToken("");
        setKees("");
        setInputDisable(false);
        setIsApproved(true);
        setIsApprovedBuy(true);
        setSpinnerAppr(false);
        setSpinnerBuy(false);
      } else {
        setSpinnerAppr(true);
        let res = await new web3_.eth.Contract(busdAbi, busdContract).methods
          .balanceOf(props.metamaskAddress)
          .call();

        console.log(res / Math.pow(10, 18), token);
        let addAppr = store.getState().ConnectivityReducer.metamaskAddress;
        setAddAppr(addAppr);

        const tkn = web3_.utils.toWei(token, "ether");
        console.log(cyberICO, tkn);
        console.log(res / Math.pow(10, 18) < parseFloat(token));
        if (res / Math.pow(10, 18) > parseFloat(token)) {
          await new web3_.eth.Contract(busdAbi, busdContract).methods
            .approve(cyberICO, tkn)
            .send({
              from: props.metamaskAddress,
            })
            .on("transactionHash", function (transactionHash) {
              console.log(transactionHash);
            })
            .on("confirmation", () => {})
            // get New Contract Address
            .then(async (res) => {
              Swal.fire("Transaction Successful", "", "success");
              setIsApproved(false);
              setInputDisable(true);
              setSpinnerAppr(false);
              setIsApprovedBuy(false);
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                "Transaction Failed",
                "Please Try After Some Time",
                "error"
              );
              setToken("");
              setKees("");
              setIsApproved(true);
              setSpinnerAppr(false);
            });
        } else {
          Swal.fire(
            `Please Enter Atleast ${token} BUSD In Your Account To Intiate This Transaction.`
          );
          setToken("");
          setKees("");
          setIsApproved(true);
          setIsApprovedBuy(true);
          setSpinnerAppr(false);
        }
      }
    }
  }
  async function handleBuy() {
    const tkn = web3_.utils.toWei(token.toString(), "ether");
    setSpinnerBuy(true);
    if (details && details[3] > Math.floor(new Date().getTime() / 1000.0)) {
      Swal.fire(
        `Investment will start from ${moment
          .unix(details[3])
          .format("DD/MM/YYYY")}`
      );
      setToken("");
      setKees("");
      setInputDisable(false);
      setIsApproved(true);
      setIsApprovedBuy(true);
      setSpinnerAppr(false);
      setSpinnerBuy(false);
    } else {
      await new web3_.eth.Contract(icoAbi, ico).methods
        .SaleICOToken(tkn)
        .send({
          from: props.metamaskAddress,
        })
        .then((res) => {
          console.log(res);
          setSpinnerBuy(false);
          Swal.fire("Transaction Successful", "", "success");
          setToken("");
          setIsApproved(true);
          setSpinnerAppr(false);
          setKees("");
          navigate("/success");
        })

        .catch((err) => {
          setSpinnerBuy(false);
          console.log(err);
          Swal.fire(
            "Transaction Failed",
            "Please Try After Some Time",
            "error"
          );
        });
    }
    console.log(await new web3_.eth.Contract(icoAbi, ico).methods);
  }
  async function handleBuyCyber() {
    const tkn = web3_.utils.toWei(token, "ether");
    setSpinnerBuy(true);
    if (
      detailsCyber &&
      detailsCyber[3] > Math.floor(new Date().getTime() / 1000.0)
    ) {
      Swal.fire(
        `Investment will start from ${moment
          .unix(details[3])
          .format("DD/MM/YYYY")}`
      );
      setToken("");
      setKees("");
      setInputDisable(false);
      setIsApproved(true);
      setIsApprovedBuy(true);
      setSpinnerAppr(false);
      setSpinnerBuy(false);
    } else {
      console.log(tkn, typeof tkn);
      await new web3_.eth.Contract(icoAbi, cyberICO).methods
        .SaleICOToken(tkn)
        .send({
          from: props.metamaskAddress,
          gasPrice: web3_.utils.toWei("0.00000002", "ether"),
        })
        .then((res) => {
          console.log(res);
          setSpinnerBuy(false);
          Swal.fire("Transaction Successful", "", "success");
          setToken("");
          setIsApproved(true);
          setSpinnerAppr(false);
          setKees("");
          navigate("/success");
        })
        .catch((err) => {
          setSpinnerBuy(false);
          console.log(err);
          Swal.fire(
            "Transaction Failed",
            "Please Try After Some Time",
            "error"
          );
        });
    }
    console.log(await new web3_.eth.Contract(icoAbi, cyberICO).methods);
  }
  return (
    <div className="main-container">
      <header className="main-header">
        <div className="header-container">
          {/* Header navbar */}
          <nav className="main-header-navbar">
            <img
              src={logo}
              alt="KeeSwap logo"
              className="main-header-navbar__logo"
              style={{ width: 320, padding: 10 }}
            />
            <ul className="main-header-navbar__nav">
              <li className="main-header-navbar__nav__item">
                <a href="#buy" className="main-header-navbar__nav__link">
                  Buy
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="#values" className="main-header-navbar__nav__link">
                  Values
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="#price" className="main-header-navbar__nav__link">
                  Price
                </a>
              </li>
              <li className="main-header-navbar__nav__item">
                <a href="#roadmap" className="main-header-navbar__nav__link">
                  Roadmap
                </a>
              </li>

              {connect ? (
                <>
                  <li className="main-header-navbar__nav__item">
                    <a href="#" className="main-header-navbar__nav__link">
                      {props.metamaskAddress &&
                        `${props.metamaskAddress.slice(
                          0,
                          3
                        )}..${props.metamaskAddress.slice(40, 42)}`}
                    </a>
                  </li>
                </>
              ) : null}

              <li className="main-header-navbar__nav__item">
                {connect ? (
                  <>
                    <a
                      className="main-header-navbar__nav__link disconnectButton"
                      onClick={() => {
                        setConnect(false);
                        DisconnectWallet();
                      }}
                    >
                      <span
                        style={{
                          borderRadius: "20px",
                          border: "1px solid green",
                          padding: 5,
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        Disconnect
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      className="main-header-navbar__nav__link disconnectButton"
                      style={{
                        borderRadius: "20px",
                        border: "1px solid green",
                        padding: 5,
                        color: "green",
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      Connect Wallet
                    </a>
                  </>
                )}
              </li>
            </ul>
          </nav>
          {/* Header content */}
          <ScrollToTop />
          <div className="main-header-content-container">
            <div className="main-header-content-principal">
              <h1 className="main-header-content-principal__title">
                The Most Securitized & Convenient Wallet To Store Cryptos &
                NFT's
              </h1>
              <p className="main-header-content-principal__description typewriter">
                Welcome to CyberVoyce where Web 2 meets Web 3. Join us in our
                journey of creating a decentralized social media that rewards
                its users! Become an influencer and take charge in how
                CyberVoyce is run. Finally a platform for users by users.
              </p>
            </div>
            <img
              src={bgImg}
              alt
              className="main-header-content-principal__illustration ball"
            />
          </div>
        </div>
      </header>
      <main className="main-content">
        {/* Why us section */}
        <section className="why-us-wrapper">
          {/* Stats */}
          <div className="stats-section">
            <div className="stats-section__reference">
              <i className="fas fa-chart-line" />
              <h3 className="stats-section__reference__title">DAO</h3>
              <p className="stats-section__reference__description">
                Crypto Wallet
              </p>
            </div>
            <div className="stats-section__reference">
              <i className="fas fa-user" />
              <h3 className="stats-section__reference__title">
                Voyce Transactions
              </h3>
              <p className="stats-section__reference__description">
                Get coins by recieveing NFT awards
              </p>
            </div>
            <div className="stats-section__reference">
              <i className="fas fa-globe" />
              <h3 className="stats-section__reference__title">Swap to ETH</h3>
              <p className="stats-section__reference__description">
                Invest & Earn
              </p>
            </div>
          </div>
          {/* Why us */}
          <div className="why-us-section" id="buy">
            <div className="why-us-section__content">
              <h2 className="why-us-section__content__title">
                Why Choose CyberVoyce?
              </h2>
              <p className="why-us-section__content__description">
                Be a part of a network where you can vote on updates and new
                features by staking CYBER. Voyce is the first platform allowing
                its users to dictate where it goes and what happens within the
                platfrom. By staking and voting we are giving you the ultimate
                voice.
              </p>
              {/* <a className="why-us-section__content__btn" onClick={handelPopup}>
                Buy Now
              </a> */}
              {console.log(
                details &&
                  details[3] < Math.floor(new Date().getTime() / 1000.0)
              )}
              {connect ? (
                <>
                  {!sale ? (
                    <>
                      {whitelisted ? (
                        <>
                          <div className="flexDivBtn" style={{ padding: 30 }}>
                            <button
                              className="glow-on-hover"
                              onClick={() => setSwitchIco("cyber")}
                              disabled={apprcyber}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <>Buy Cyber</>
                              </div>
                            </button>
                            <button
                              className="glow-on-hover"
                              onClick={() => setSwitchIco("voyce")}
                              disabled={apprcyber}
                            >
                              <>Buy Voyce</>
                            </button>
                          </div>
                          {switchIco == "cyber" ? (
                            <>
                              {" "}
                              {!cyberIcoOver ? (
                                <>
                                  <div
                                    className="flexDiv"
                                    style={{
                                      background: "white",
                                      maxWidth: "400px",
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      borderRadius: "10px",
                                      padding: "25px 15px",
                                      textAlign: "justify",
                                    }}
                                  >
                                    <div>
                                      <h1
                                        style={{
                                          textAlign: "center",
                                          color: "black",
                                          fontSize: "28px !important",
                                        }}
                                      >
                                        Buy Cyber
                                      </h1>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          onChange={handleChange}
                                          placeholder="Enter Amount To Buy"
                                          style={{
                                            padding: 8,
                                            marginTop: 10,
                                            width: "100%",
                                            border:
                                              "2px solid black !important",
                                            backgroundColor: "#e9ecef",
                                            borderRadius: 5,
                                            fontSize: 14,
                                          }}
                                          value={token}
                                          disabled={inputDisable}
                                        />
                                        <div
                                          style={{
                                            padding: 5,
                                            border: "1px solid black",
                                            width: "85px",
                                            justifyContent: "space-around",
                                            marginTop: "10px",
                                            backgroundColor: "#e9ecef",
                                            borderRadius: 7,
                                            marginLeft: 8,
                                            fontSize: 14,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img src={bnb} width="20" />
                                          <div>BUSD</div>
                                        </div>
                                      </div>

                                      <span>
                                        <p style={{ color: "red" }}>{error}</p>
                                      </span>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder={`${kees} Cyber`}
                                          style={{
                                            padding: 10,
                                            marginTop: 10,
                                            fontSize: 15,
                                            width: "100%",
                                          }}
                                          disabled
                                        />
                                        <div
                                          style={{
                                            padding: 5,
                                            border: "1px solid black",
                                            width: "85px",
                                            justifyContent: "space-around",
                                            marginTop: "10px",
                                            borderRadius: 7,
                                            marginLeft: 8,
                                            fontSize: 14,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div>Cyber</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flexDivBtn">
                                      {isApproved ? (
                                        <>
                                          {" "}
                                          <button
                                            className="glow-on-hover"
                                            onClick={handleApproveCyber}
                                            disabled={
                                              token == "" || isApproved == false
                                            }
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                              }}
                                            >
                                              {spinnerAppr ? (
                                                <Spinner
                                                  name="circle"
                                                  style={{
                                                    width: 30,
                                                    height: 30,
                                                  }}
                                                />
                                              ) : (
                                                <>Approve</>
                                              )}
                                            </div>
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            className="glow-on-hover"
                                            onClick={handleBuyCyber}
                                            disabled={
                                              isApproved || isApprovedBuy
                                            }
                                          >
                                            {spinnerBuy ? (
                                              <Spinner
                                                name="circle"
                                                style={{
                                                  width: 30,
                                                  height: 30,
                                                }}
                                              />
                                            ) : (
                                              <>Buy</>
                                            )}
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <button
                                  className="glow-on-hover"
                                  style={{
                                    width: "300px",
                                    height: "auto",
                                    padding: 10,
                                  }}
                                >
                                  Cyber ICO Is Over You Can Not Invest
                                </button>
                              )}
                            </>
                          ) : null}
                          {switchIco == "voyce" ? (
                            <>
                              {!sale ? (
                                <>
                                  <div
                                    className="flexDiv"
                                    style={{
                                      background: "white",
                                      maxWidth: "400px",
                                      backgroundColor: "#fff",
                                      color: "#000",
                                      borderRadius: "10px",
                                      padding: "25px 15px",
                                      textAlign: "justify",
                                    }}
                                  >
                                    <div>
                                      <h1
                                        style={{
                                          textAlign: "center",
                                          color: "black",
                                          fontSize: "28px !important",
                                        }}
                                      >
                                        Buy Voyce
                                      </h1>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          onChange={handleChange}
                                          placeholder="Enter Amount To Buy"
                                          style={{
                                            padding: 8,
                                            marginTop: 10,
                                            width: "100%",
                                            border:
                                              "2px solid black !important",
                                            backgroundColor: "#e9ecef",
                                            borderRadius: 5,
                                            fontSize: 14,
                                          }}
                                          value={token}
                                          disabled={inputDisable}
                                        />
                                        <div
                                          style={{
                                            padding: 5,
                                            border: "1px solid black",
                                            width: "85px",
                                            justifyContent: "space-around",
                                            marginTop: "10px",
                                            backgroundColor: "#e9ecef",
                                            borderRadius: 7,
                                            marginLeft: 8,
                                            fontSize: 14,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <img src={bnb} width="20" />
                                          <div>BUSD</div>
                                        </div>
                                      </div>

                                      <span>
                                        <p style={{ color: "red" }}>{error}</p>
                                      </span>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          placeholder={`${kees} Voyce`}
                                          style={{
                                            padding: 10,
                                            marginTop: 10,
                                            fontSize: 15,
                                            width: "100%",
                                          }}
                                          disabled
                                        />
                                        <div
                                          style={{
                                            padding: 5,
                                            border: "1px solid black",
                                            width: "85px",
                                            justifyContent: "space-around",
                                            marginTop: "10px",
                                            borderRadius: 7,
                                            marginLeft: 8,
                                            fontSize: 14,
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div>Voyce</div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flexDivBtn">
                                      {isApproved ? (
                                        <>
                                          {" "}
                                          <button
                                            className="glow-on-hover"
                                            onClick={handleApprove}
                                            disabled={
                                              token == "" || isApproved == false
                                            }
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                              }}
                                            >
                                              {spinnerAppr ? (
                                                <Spinner
                                                  name="circle"
                                                  style={{
                                                    width: 30,
                                                    height: 30,
                                                  }}
                                                />
                                              ) : (
                                                <>Approve</>
                                              )}
                                            </div>
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <button
                                            className="glow-on-hover"
                                            onClick={handleBuy}
                                            disabled={
                                              isApproved || isApprovedBuy
                                            }
                                          >
                                            {spinnerBuy ? (
                                              <Spinner
                                                name="circle"
                                                style={{
                                                  width: 30,
                                                  height: 30,
                                                }}
                                              />
                                            ) : (
                                              <>Buy</>
                                            )}
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <h1>Voyce is over</h1>
                              )}
                            </>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {spinnerBuy ? (
                            <Spinner
                              name="circle"
                              style={{ width: 30, height: 30 }}
                            />
                          ) : (
                            <a
                              className="glow-on-hover"
                              href="https://surveyheart.com/form/62e9df5224ff9216a54ad52a"
                              target="_blank"
                              style={{
                                width: "300px",
                                height: "auto",
                                padding: 10,
                                textDecoration: "none",
                                textAlign: "center",
                              }}
                            >
                              Add To Whitelist
                            </a>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        className="glow-on-hover"
                        style={{ width: "300px", height: "auto", padding: 10 }}
                      >
                        ICO Is Over You Can Not Invest
                      </button>
                    </>
                  )}
                </>
              ) : (
                <button
                  className="glow-on-hover"
                  style={{ width: "300px", height: "auto", padding: 10 }}
                >
                  Please Connect Wallet
                </button>
              )}
            </div>
            <img
              src={bgImg2}
              alt
              className="why-us-section__illustration ball imgCls"
            />
          </div>
          {connect ? (
            <>
              <div className="benefits-section" id="price">
                <h2 className="benefits-section__title">
                  Check how much you can <span>earn</span>
                </h2>
                <p className="benefits-section__description">
                  CyberVoyce also provides the user an opportunity to convert
                  its crypto into fiat and vice-versa
                </p>
                <div className="card-info">
                  <h2
                    className="card-info__title"
                    style={{ textAlign: "center", padding: 10, fontSize: 20 }}
                  >
                    Token Information{" "}
                  </h2>
                  {switchIco == "cyber" ? (
                    <>
                      <div>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Presale Rate :</div>
                          <div>
                            {detailsCyber && detailsCyber[2] / Math.pow(10, 18)}{" "}
                            BUSD
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Start Time :</div>
                          <div>
                            {detailsCyber &&
                              moment.unix(detailsCyber[3]).format("DD/MM/YYYY")}
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>End Time :</div>
                          <div>
                            {detailsCyber &&
                              moment.unix(detailsCyber[4]).format("DD/MM/YYYY")}
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>User Will Get :</div>
                          <div>
                            {kees + " "}
                            Cyber
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Vesting Round :</div>
                          <div>0</div>
                        </h4>
                        {!sale && (
                          <CounterComponent endDate={detailsCyber[4]} />
                        )}
                      </div>

                      <p className="card-info__description">
                        {!sale && (
                          <ProgressBar
                            animated
                            now={(detailsCyber[5] / detailsCyber[7]) * 100}
                          />
                        )}
                      </p>
                      <span className="card-info__advice">
                        Revenue will change based on mining difficulty and BUSD
                        Price.
                      </span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Presale Rate :</div>
                          <div>
                            {details && details[2] / Math.pow(10, 18)} BUSD
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Start Time :</div>
                          <div>
                            {details &&
                              moment.unix(details[3]).format("DD/MM/YYYY")}
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>End Time :</div>
                          <div>
                            {details &&
                              moment.unix(details[4]).format("DD/MM/YYYY")}
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>User Will Get :</div>
                          <div>
                            {kees + " "}
                            Voyce
                          </div>
                        </h4>
                        <h4
                          className="card-info__title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Vesting Round :</div>
                          <div>0</div>
                        </h4>
                        {!sale && <CounterComponent endDate={details[4]} />}
                      </div>
                      <p className="card-info__description">
                        {!sale && (
                          <ProgressBar
                            animated
                            now={(details[5] / details[7]) * 100}
                          />
                        )}
                      </p>
                      <span className="card-info__advice">
                        Revenue will change based on mining difficulty and BUSD
                        Price.
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
        {/* Cryptocurrencies section */}
        <section className="cryptocurrencies-section" id="products">
          <h2 className="cryptocurrencies-section__title">
            Advantages Of Using CyberVoyce
          </h2>
          <div className="cryptocurrencies-info-cards">
            <div className="info-card">
              <img src={cardicon1} width="60" />
              <h3 className="info-card__title">DAO</h3>
              <p className="info-card__description">
                Be a part of a network where you can vote on updates, new
                features and algorith changes by staking CYBER. By staking and
                voting we are giving you the ultimate voice.
              </p>
            </div>
            <div className="info-card">
              <img src={cardicon2} width="60" />
              <h3 className="info-card__title">Voyce Transactions</h3>
              <p className="info-card__description">
                Voyce are simple. Get coins by recieveing NFT awards and
                donations on your post. Give coins by posting, gifting NFT
                awards, and supporting post with donations. Spend Voyce on our
                market place or minting your posts into NFTs to monitize your
                platform.
              </p>
            </div>
            <div className="info-card">
              <img src={cardicon3} width="60" />
              <h3 className="info-card__title">Voyce Swap</h3>
              <p className="info-card__description">
                We want our users to become sucessful infulencers in this new
                age. Use our echange to cash out or buy more of our native
                currency and grow your portfolio.
              </p>
            </div>
          </div>
        </section>
        {/* Features section */}
        <section className="features-section" id="values">
          <h2 className="features-section__title">Our Core Values</h2>
          <article className="invest-smart-article">
            <div
              className="invest-smart-article__content justify-center md:justify-baseline"
              style={{ flexDirection: "column", alignItems: "unset" }}
            >
              <h2
                className="invest-smart-article__content__title"
                style={{ fontSize: "4rem !important" }}
              >
                OUR VISION{" "}
              </h2>
              <br />
              <p className="invest-smart-article__content__description">
                CyberVoyces vision is to create the first true platform that
                merges Web 2 and Web 3. We see a decentralized social platform
                where any user can own their data and monetize their following.
              </p>
            </div>
            <img
              src={side1}
              style={{ width: 300 }}
              alt="Crypto stats"
              className="invest-smart-article__graphic"
            />
          </article>
          <article className="detailed-stats-article">
            <div className="detailed-stats-article__content">
              <h2 className="detailed-stats-article__content__title">
                OUR MISSION
              </h2>
              <p className="detailed-stats-article__content__description">
                We want to give all users the tools to create any form of media,
                create them into NFTs, and monetize from them without the need
                to sell if the creator wants to keep the NFT. Any form of media
                from videos, pictures, filters, music, and more can be made into
                NFTs for the world to use and see! Any and all forms of NFTs
                will have the ability to generate income for the original owner.
                We will give these tools to all users, but then it will be up to
                the user for their success. Not only do we want users to
                monetize and own their data but we want them to vote on how the
                platform works! From UI changes , algorithm resets, ease of use,
                etc. users have the ultimate voyce on how CyberVoyce is run.
                Finally a platfrom for users by users.
              </p>
            </div>
            <img
              src={side2}
              style={{ width: 300 }}
              alt="Detailed statistics"
              className="detailed-stats-article__graphic"
            />
          </article>
          <article className="grow-profit-article">
            <div
              className="grow-profit-article__content items-baseline md:justify-center"
              style={{ flexDirection: "column", alignItems: "unset" }}
            >
              <h2
                className="grow-profit-article__content__title"
                style={{ fontSize: "24px !important" }}
              >
                Inclusivity
              </h2>
              <p className="grow-profit-article__content__description">
                At CyberVoyce we put inclusivity at the center of our purpose.
              </p>
            </div>
            <img
              src={side3}
              style={{ width: 300, height: 400 }}
              alt="Profit graphic"
              className="grow-profit-article__graphic"
            />
          </article>
          {/* <div class="basr-social-share social">
            <ul class="">
              <li>
                <a class="facebook" href="">
                  <i class="fa fa-facebook"></i>
                  <span>Facebook</span>
                </a>
              </li>

              <li>
                <a class="twitter" href="">
                  <i class="fa fa-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>

              <li>
                <a class="googleplus" href="">
                  <i class="fa fa-google-plus"></i>
                  <span>Google Plus</span>
                </a>
              </li>

              <li>
                <a class="linkedin" href="">
                  <i class="fa fa-linkedin"></i>
                  <span>Linkedin</span>
                </a>
              </li>

              <li>
                <a class="tumblr" href="">
                  <i class="fa fa-tumblr"></i>
                  <span>Tumblr</span>
                </a>
              </li>
            </ul>
          </div> */}
        </section>
        <section>
          <h1
            style={{
              textAlign: "center",
              margin: "0 auto",
              textAlign: "center",
              fontSize: 30,
              color: "aliceblue",
              padding: 40,
            }}
          >
            See Us At
          </h1>
          <div
            className="Social"
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: 60,
            }}
          >
            <img src={CoinGecko} className="socialWidth" />

            <img src={CoinMoon} className="socialWidth" />

            <img src={CoinScope} className="socialWidth" />

            <img src={Coinod} className="socialWidth" />
            <img src={CoinMarket} className="socialWidth" />
            <img src={pancakeswap} className="socialWidth" />
          </div>
        </section>
      </main>
      {/* Call To Action */}

      <section>
        <Carosual />
      </section>
      <section id="roadmap" style={{ marginTop: 50 }}>
        <img src={RoadmapPc} className="widthCls" />
      </section>

      <Footer />
      {/* Attribution footer */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    metamaskAddress: state.ConnectivityReducer.metamaskAddress,
    metamaskConnect: state.ConnectivityReducer.metamaskConnect,
  };
};
export default connect(mapStateToProps, null)(HomePage);
