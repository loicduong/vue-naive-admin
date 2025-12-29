/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      current: number
      /** page size */
      size: number
      /** total count */
      total: number
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      records: T[]
    }

    /** common search params of table */
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = '1' | '2'

    /** common record */
    type CommonRecord<T = any> = {
      /** record id */
      id: number
      /** record creator */
      createBy: string
      /** record create time */
      createTime: string
      /** record updater */
      updateBy: string
      /** record update time */
      updateTime: string
      /** record status */
      status: EnableStatus | null
    } & T
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      token: string
      refreshToken: string
    }

    interface UserInfo {
      userId: string
      userName: string
      roles: string[]
      buttons: string[]
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'current' | 'size'>

    /** role */
    type Role = Common.CommonRecord<{
      /** role name */
      roleName: string
      /** role code */
      roleCode: string
      /** role description */
      roleDesc: string
    }>

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'status'> & CommonSearchParams
    >

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>

    /** all role */
    type AllRole = Pick<Role, 'id' | 'roleName' | 'roleCode'>

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = '1' | '2'

    /** user */
    type User = Common.CommonRecord<{
      /** user name */
      userName: string
      /** user gender */
      userGender: UserGender | null
      /** user nick name */
      nickName: string
      /** user phone */
      userPhone: string
      /** user email */
      userEmail: string
      /** user role code collection */
      userRoles: string[]
    }>

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.User, 'userName' | 'userGender' | 'nickName' | 'userPhone' | 'userEmail' | 'status'>
      & CommonSearchParams
    >

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>
  }
}
