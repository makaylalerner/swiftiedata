import { createTimeline } from './timeline.js'

d3.csv("https://gist.githubusercontent.com/makaylalerner/6e13282b20c8c4b11355ecd583e47f2e/raw/b7245f5122c539eafd29beb02bf6f5dea37456db/data_taylors_version2.csv").then((data) => {
  createTimeline(data);
});