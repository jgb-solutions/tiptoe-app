import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
// Initialize days with RelativeTime plugin
dayjs.extend(relativeTime)

export { dayjs }
