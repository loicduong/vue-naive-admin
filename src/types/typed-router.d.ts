/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/403': RouteRecordInfo<'/403', '/403', Record<never, never>, Record<never, never>>,
    '/404': RouteRecordInfo<'/404', '/404', Record<never, never>, Record<never, never>>,
    '/500': RouteRecordInfo<'/500', '/500', Record<never, never>, Record<never, never>>,
    '/home': RouteRecordInfo<'/home', '/home', Record<never, never>, Record<never, never>>,
    '/iframe-page.[url]': RouteRecordInfo<'/iframe-page.[url]', '/iframe-page/:url', { url: ParamValue<true> }, { url: ParamValue<false> }>,
    '/login': RouteRecordInfo<'/login', '/login/:module(pwd-login|code-login|register|reset-pwd)?', Record<never, never>, Record<never, never>>,
  }
}
