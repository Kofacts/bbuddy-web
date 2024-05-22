import { createApp } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'

const scroll = new LocomotiveScroll({
  // Set Locomotive Scroll options here
  // For example:
  smooth: true,
  direction: 'vertical',
  // Add more options as needed
})

export default ({ app }) => {
  app.use(scroll)
}