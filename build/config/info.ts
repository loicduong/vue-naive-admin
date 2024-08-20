import { execSync } from 'node:child_process'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export function getBuildInfo() {
  const commitHash = getBuildCommitHash()
  const version = getBuildVersion()

  return {
    desc: `${version}_${commitHash}`,
    time: getBuildTime(),
    commitHash,
    version,
  }
}

function getBuildVersion() {
  return execSync(
    `git log -i --pretty=format:%s -P -1 --grep="\\s*(dev|--\\s*v)\\s*+(\\d+\\.)(\\d+\\.)?(\\*|\\d+)*"`,
  )
    .toString()
    .trim()
    .match(/(\d+\.)(\d+\.)?(\*|\d+)*/g)
    ?.find(x => x) || '0.0.0'
}

function getBuildCommitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim()
}

function getBuildTime() {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const buildTime = dayjs.tz(Date.now(), 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss')

  return buildTime
}
