import React, { Component } from "react";
import logo from "./logo.svg";
import { Radio, TimePicker, Row } from "antd";
import { Typography } from "antd";
import moment from "moment";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import QueueAnim from "rc-queue-anim";

import "./App.css";

const { Title, Paragraph, Text } = Typography;

const getGreetingText = () => {
  const today = new Date();
  const curHr = today.getHours();
  let greeting;

  if (curHr < 12) {
    greeting = "Good morning,";
  } else if (curHr < 18) {
    greeting = "Good afternoon,";
  } else {
    greeting = "Good evening,";
  }
  return greeting + " friend!";
};

const wakeUpTime = (sleepTime) => {
  if (!sleepTime) return;
  const sleepDate = new Date(sleepTime);
  const oneMinInMS = 60_000;
  const firstRemMins = 104;
  const avgRemMins = 90;
  const remArray = [];

  for (let rem = 0; rem < 6; rem++) {
    // const element = array[rem];
    if (rem === 0) {
      remArray.push(new Date(sleepDate.getTime() + firstRemMins * oneMinInMS));
    } else {
      remArray.push(
        new Date(remArray[rem - 1].getTime() + avgRemMins * oneMinInMS)
      );
    }
  }

  return remArray.map((item, index) => (
    <div key={index} className="wake-options">
      {moment(remArray[index]).format("h:mm a")}
    </div>
  ));
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleepTime: null,
      sleepOrWakeMode: null,
      animType: "top",
      aniMode: "sync",
    };
  }

  render() {
    const { sleepOrWakeMode, sleepTime } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} color="red" className="App-logo" alt="logo" />

          <Title level={2}>
            <Texty type={this.state.animType} mode={this.state.aniMode}>
              {!this.state.sleepOrWakeMode && getGreetingText()}
            </Texty>
          </Title>
          <Title level={4}>
            <Texty type={this.state.animType} mode={this.state.aniMode}>
              {!this.state.sleepOrWakeMode && "Let's get some quality bedtime"}
            </Texty>
          </Title>
          {!this.state.sleepOrWakeMode && <br />}
          <Paragraph>When should I ...</Paragraph>
          <Radio.Group
            size="large"
            onChange={(event) => {
              if (event.target.value === "wake") {
                this.setState({ sleepTime: moment()._d });
              }
              this.setState({ sleepOrWakeMode: event.target.value });
            }}
          >
            <Radio.Button value="wake">Wake up</Radio.Button>
            <Radio.Button disabled value="sleep">
              Sleep
            </Radio.Button>
          </Radio.Group>

          <br />

          {sleepOrWakeMode === "wake" && (
            <div className="wake-container">
              <Row gutter={[16, 16]}>
                <Text>If you sleep at </Text>{" "}
                <TimePicker
                  inputReadOnly={true}
                  autoFocus={true}
                  use12Hours
                  format="h:mm a"
                  defaultValue={moment(moment(), "h:mm")}
                  allowClear={false}
                  onChange={(event) => {
                    this.setState({ sleepTime: event._d });
                  }}
                />
              </Row>

              <Row gutter={[16, 16]}>
                <Paragraph>Try waking up at</Paragraph>
              </Row>
              <Row gutter={[16, 16]}>
                <QueueAnim delay={500} className="queue-simple">
                  {wakeUpTime(sleepTime)}
                </QueueAnim>
              </Row>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
