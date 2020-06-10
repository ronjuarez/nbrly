import React, { Fragment } from 'react'
import { storiesOf } from "@storybook/react";
import Leaderboard from "./components/Leaderboard"

storiesOf("Leaderboard", module)
  .add("Leaderboard", () => <Leaderboard />)