import { createTimeline } from './timeline.js'

d3.csv("https://gist.githubusercontent.com/makaylalerner/7e710a423a5157167c1b5b044ef85778/raw/ea194d1e0701346e62d2d5731c1dc8996a6eaa23/data_taylors_version2.csv").then((data) => {
  createTimeline(data);
});