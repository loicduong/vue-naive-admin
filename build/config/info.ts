import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import packageJson from '../../package.json'

export function getBuildInfo() {
  const version = packageJson.version

  return {
    desc: `${version}`,
    time: getBuildTime(),
    version,
  }
}

function getBuildTime() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const buildTime = dayjs.tz(Date.now(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')

  return buildTime
}
