const local: App.I18n.Schema = {
  system: {
    title: 'VueNaiveAdmin',
    updateTitle: 'Thông báo cập nhật phiên bản hệ thống',
    updateContent: 'Phát hiện phiên bản mới của hệ thống, bạn có muốn làm mới trang ngay bây giờ không?',
    updateConfirm: 'Làm mới ngay',
    updateCancel: 'Để sau',
  },
  common: {
    action: 'Hành động',
    add: 'Thêm mới',
    addSuccess: 'Thêm thành công',
    backToHome: 'Quay lại trang chủ',
    batchDelete: 'Xóa hàng loạt',
    cancel: 'Hủy',
    close: 'Đóng',
    check: 'Chọn',
    expandColumn: 'Mở rộng cột',
    columnSetting: 'Cài đặt cột',
    config: 'Cấu hình',
    confirm: 'Xác nhận',
    delete: 'Xóa',
    deleteSuccess: 'Xóa thành công',
    confirmDelete: 'Bạn có chắc chắn muốn xóa không?',
    edit: 'Chỉnh sửa',
    warning: 'Cảnh báo',
    error: 'Lỗi',
    index: 'Số thứ tự',
    keywordSearch: 'Nhập từ khóa tìm kiếm',
    logout: 'Đăng xuất',
    logoutConfirm: 'Bạn có chắc chắn muốn đăng xuất không?',
    lookForward: 'Hãy chờ đợi',
    modify: 'Sửa đổi',
    modifySuccess: 'Sửa đổi thành công',
    noData: 'Không có dữ liệu',
    operate: 'Vận hành',
    pleaseCheckValue: 'Vui lòng kiểm tra giá trị đã nhập có hợp lệ không',
    refresh: 'Làm mới',
    reset: 'Đặt lại',
    search: 'Tìm kiếm',
    switch: 'Chuyển đổi',
    tip: 'Gợi ý',
    trigger: 'Kích hoạt',
    update: 'Cập nhật',
    updateSuccess: 'Cập nhật thành công',
    userCenter: 'Trung tâm người dùng',
    yesOrNo: {
      yes: 'Có',
      no: 'Không',
    },
  },
  request: {
    logout: 'Đăng xuất người dùng sau khi yêu cầu thất bại',
    logoutMsg: 'Trạng thái người dùng hết hiệu lực, vui lòng đăng nhập lại',
    logoutWithModal: 'Đăng xuất người dùng sau khi yêu cầu thất bại và hiển thị hộp thoại',
    logoutWithModalMsg: 'Trạng thái người dùng hết hiệu lực, vui lòng đăng nhập lại',
    refreshToken: 'Yêu cầu mã thông báo đã hết hạn, làm mới mã thông báo',
    tokenExpired: 'Mã thông báo đã hết hạn',
  },
  theme: {
    themeSchema: {
      title: 'Chế độ chủ đề',
      light: 'Chế độ sáng',
      dark: 'Chế độ tối',
      auto: 'Theo hệ thống',
    },
    layoutMode: {
      'title': 'Chế độ bố cục',
      'vertical': 'Chế độ menu bên trái',
      'vertical-mix': 'Chế độ menu bên trái kết hợp',
      'horizontal': 'Chế độ menu trên cùng',
      'horizontal-mix': 'Chế độ menu trên cùng kết hợp',
      'reverseHorizontalMix': 'Vị trí menu cấp 1 và menu cấp 2 đảo ngược',
    },
    themeColor: {
      title: 'Màu chủ đề',
      primary: 'Màu chính',
      info: 'Màu thông tin',
      success: 'Màu thành công',
      warning: 'Màu cảnh báo',
      error: 'Màu lỗi',
    },
    scrollMode: {
      title: 'Chế độ cuộn',
      wrapper: 'Cuộn ngoài',
      content: 'Cuộn nội dung',
    },
    page: {
      animate: 'Hiệu ứng chuyển trang',
      mode: {
        'title': 'Loại hiệu ứng chuyển trang',
        'fade-slide': 'Trượt',
        'fade': 'Hiện ra mờ dần',
        'fade-bottom': 'Mờ dần từ dưới lên',
        'fade-scale': 'Thu nhỏ mờ dần',
        'zoom-fade': 'Hiện ra từ từ',
        'zoom-out': 'Hiện ra nhanh',
        'none': 'Không có',
      },
    },
    fixedHeader: 'Cố định tiêu đề',
    header: {
      height: 'Chiều cao tiêu đề',
      breadcrumb: {
        visible: 'Hiển thị breadcrumb',
        showIcon: 'Hiển thị biểu tượng breadcrumb',
      },
      multilingual: {
        visible: 'Hiển thị nút chuyển đổi ngôn ngữ',
      },
    },
    sider: {
      width: 'Chiều rộng thanh bên',
      collapsedWidth: 'Chiều rộng thanh bên khi thu gọn',
      mixWidth: 'Chiều rộng thanh bên chế độ kết hợp',
      mixCollapsedWidth: 'Chiều rộng thanh bên chế độ kết hợp khi thu gọn',
      mixChildMenuWidth: 'Chiều rộng menu con chế độ kết hợp',
    },
    footer: {
      visible: 'Hiển thị footer',
      fixed: 'Cố định footer',
      height: 'Chiều cao footer',
      right: 'Footer phía bên phải',
    },
    themeDrawerTitle: 'Cấu hình chủ đề',
    pageFunTitle: 'Chức năng trang',
    resetCacheStrategy: {
      title: 'Chiến lược đặt lại cache',
      close: 'Đóng trang',
      refresh: 'Làm mới trang',
    },
    configOperation: {
      copyConfig: 'Sao chép cấu hình',
      copySuccessMsg: 'Sao chép thành công, vui lòng thay thế biến themeSettings trong src/theme/settings.ts',
      resetConfig: 'Đặt lại cấu hình',
      resetSuccessMsg: 'Đặt lại thành công',
    },
  },
  route: {
    '/login': 'Đăng nhập',
    '/403': 'Không có quyền',
    '/404': 'Trang không tồn tại',
    '/500': 'Lỗi máy chủ',
    '/home': 'Trang chủ',
    '/document': 'Tài liệu',
    '/document/naive': 'Tài liệu Naive UI',
    '/document/unocss': 'Tài liệu UnoCSS',
    '/document/vite': 'Tài liệu Vite',
    '/document/vue': 'Tài liệu Vue',
    '/about': 'Giới thiệu',
    '/user-center': 'Trung tâm người dùng',
    '/function': 'Chức năng hệ thống',
    '/function/hide-child': 'Ẩn con',
    '/function/hide-child/one': 'Ẩn con',
    '/function/hide-child/two': 'Hai',
    '/function/hide-child/three': 'Ba',
    '/function/request': 'Yêu cầu',
    '/plugin': 'Tiện ích',
    '/plugin/audio': 'Audio',
    '/plugin/copy': 'Sao chép',
    '/plugin/icon': 'Icon',
    '/plugin/map': 'Bản đồ',
    '/plugin/map/google': 'Google',
    '/plugin/pdf': 'Xem trước PDF',
    '/plugin/pdf/html': 'HTML',
    '/plugin/pdf/link': 'Link',
    '/plugin/signature': 'Chữ ký',
    '/plugin/swiper': 'Swiper',
    '/plugin/typeit': 'Typeit',
    '/plugin/video': 'Video',
    '/plugin/charts': 'Biểu đồ',
    '/plugin/charts/antv': 'AntV',
    '/plugin/charts/d3': 'D3',
    '/plugin/charts/echarts': 'ECharts',
    '/plugin/charts/vchart': 'VChart',
    '/plugin/excel': 'Excel',
    '/plugin/flow': 'Biểu đồ flow',
    '/plugin/flow/vue-flow': 'Vue Flow',
    '/plugin/gantt': 'Biểu đồ Gantt',
    '/plugin/gantt/dhtmlx': 'dhtmlxGantt',
    '/plugin/gantt/vtable': 'VTableGantt',
    '/plugin/guide': 'Hướng dẫn',
    '/plugin/json': 'JSON Editor',
    '/plugin/json/json-editor-vue': 'JSON Editor Vue',
    '/plugin/json/vue-json-pretty': 'Vue JSON Pretty',
    '/plugin/tables': 'Bảng',
    '/plugin/tables/vtable': 'VTable',
    '/plugin/tables/ag-grid': 'AG Grid',
    '/multi-menu': 'Menu nhiều cấp',
    '/multi-menu/first': 'Menu một',
    '/multi-menu/first/child': 'Menu con một',
    '/multi-menu/second': 'Menu hai',
    '/multi-menu/second/child': 'Menu con hai',
    '/multi-menu/second/child/home': 'Menu con hai nhà',
    '/manage': 'Quản lý hệ thống',
    '/manage/role': 'Quản lý vai trò',
    '/manage/user': 'Quản lý người dùng',
    '/manage/user-detail.[id]': 'Chi tiết người dùng',
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Đăng nhập / Đăng ký',
        userNamePlaceholder: 'Vui lòng nhập tên người dùng',
        phonePlaceholder: 'Vui lòng nhập số điện thoại',
        codePlaceholder: 'Vui lòng nhập mã xác nhận',
        passwordPlaceholder: 'Vui lòng nhập mật khẩu',
        confirmPasswordPlaceholder: 'Vui lòng nhập lại mật khẩu',
        codeLogin: 'Đăng nhập bằng mã xác nhận',
        confirm: 'Xác nhận',
        back: 'Quay lại',
        validateSuccess: 'Xác thực thành công',
        loginSuccess: 'Đăng nhập thành công',
        welcomeBack: 'Chào mừng trở lại, {userName}!',
      },
      pwdLogin: {
        title: 'Đăng nhập',
        rememberMe: 'Ghi nhớ',
        forgetPassword: 'Quên mật khẩu?',
        register: 'Đăng ký',
        otherAccountLogin: 'Đăng nhập bằng tài khoản khác',
        otherLoginMode: 'Phương thức đăng nhập khác',
        superAdmin: 'Quản trị viên cấp cao',
        admin: 'Quản trị viên',
        user: 'Người dùng',
      },
      codeLogin: {
        title: 'Đăng nhập bằng mã xác nhận',
        getCode: 'Nhận mã xác nhận',
        reGetCode: 'Nhận lại mã sau {time} giây',
        sendCodeSuccess: 'Gửi mã xác nhận thành công',
        imageCodePlaceholder: 'Vui lòng nhập mã xác nhận hình ảnh',
      },
      register: {
        title: 'Đăng ký',
        agreement: 'Tôi đã đọc và chấp nhận',
        protocol: '《Thỏa thuận người dùng》',
        policy: '《Chính sách bảo mật》',
      },
      resetPwd: {
        title: 'Đặt lại mật khẩu',
      },
    },
    home: {
      greeting: 'Chào buổi sáng, {userName}, hôm nay lại là một ngày tràn đầy năng lượng!',
      weatherDesc: 'Hôm nay có mây chuyển nắng, 20℃ - 25℃!',
      projectCount: 'Số dự án',
      todo: 'Công việc cần làm',
      message: 'Tin nhắn',
      downloadCount: 'Số lượt tải về',
      registerCount: 'Số lượt đăng ký',
      schedule: 'Lịch trình',
      study: 'Học tập',
      work: 'Công việc',
      rest: 'Nghỉ ngơi',
      entertainment: 'Giải trí',
      visitCount: 'Số lượt truy cập',
      turnover: 'Doanh thu',
      dealCount: 'Số lượng giao dịch',
      projectNews: {
        title: 'Tin tức dự án',
        moreNews: 'Xem thêm tin tức',
        desc1: 'Loic Duong đã tạo dự án mã nguồn mở vue-naive-admin vào ngày 28 tháng 5 năm 2024!',
        desc2: 'Loic Duong đã gửi một lỗi cho vue-naive-admin, thanh tab đa thẻ không tự động điều chỉnh.',
        desc3: 'Loic Duong đang chuẩn bị cho việc phát hành của vue-naive-admin!',
        desc4: 'Loic Duong vừa viết một số tài liệu giới thiệu dự án cho vue-naive-admin!',
        desc5: 'Loic Duong vừa viết một số nội dung tạm thời cho trang bàn làm việc của vue-naive-admin!',
      },
      creativity: 'Sáng tạo',
    },
    function: {
      request: {
        repeatedErrorOccurOnce: 'Lỗi yêu cầu lặp lại xảy ra một lần',
        repeatedError: 'Lỗi yêu cầu lặp lại',
        repeatedErrorMsg1: 'Lỗi yêu cầu tùy chỉnh 1',
        repeatedErrorMsg2: 'Lỗi yêu cầu tùy chỉnh 2',
      },
    },
    about: {
      title: 'Giới thiệu',
      introduction: `VueNaiveAdmin là một mẫu quản trị thanh lịch và mạnh mẽ, dựa trên công nghệ front-end mới nhất, bao gồm Vue 3, Vite 6, TypeScript, Pinia và UnoCSS. Nó có cấu hình chủ đề phong phú và các thành phần tích hợp sẵn, các quy định mã nghiêm ngặt và một hệ thống định tuyến tệp tự động. Ngoài ra, nó cũng sử dụng giải pháp dữ liệu giả trực tuyến dựa trên ApiFox. VueNaiveAdmin cung cấp cho bạn một giải pháp quản trị một điểm dừng, không cần cấu hình thêm, và sẵn sàng sử dụng. Nó cũng là một phương pháp tốt nhất để học các công nghệ tiên tiến nhanh chóng.`,
      projectInfo: {
        title: 'Thông tin dự án',
        version: 'Phiên bản',
        latestBuildTime: 'Thời gian xây dựng mới nhất',
        githubLink: 'Liên kết Github',
        previewLink: 'Liên kết xem trước',
        node: 'Phiên bản Node khuyến nghị',
        pnpm: 'Phiên bản pnpm khuyến nghị',
      },
      prdDep: 'Phụ thuộc sản xuất',
      devDep: 'Phụ thuộc phát triển',
    },
    manage: {
      common: {
        status: {
          enable: 'Kích hoạt',
          disable: 'Vô hiệu hóa',
        },
      },
      role: {
        title: 'Danh sách vai trò',
        roleName: 'Tên vai trò',
        roleCode: 'Mã vai trò',
        roleStatus: 'Trạng thái vai trò',
        roleDesc: 'Mô tả vai trò',
        menuAuth: 'Quyền menu',
        buttonAuth: 'Quyền nút',
        form: {
          roleName: 'Vui lòng nhập tên vai trò',
          roleCode: 'Vui lòng nhập mã vai trò',
          roleStatus: 'Vui lòng chọn trạng thái vai trò',
          roleDesc: 'Vui lòng nhập mô tả vai trò',
        },
        addRole: 'Thêm vai trò',
        editRole: 'Sửa vai trò',
      },
      user: {
        title: 'Danh sách người dùng',
        userName: 'Tên người dùng',
        userGender: 'Giới tính',
        nickName: 'Biệt danh',
        userPhone: 'Số điện thoại',
        userEmail: 'Email',
        userStatus: 'Trạng thái',
        userRole: 'Vai trò',
        form: {
          userName: 'Vui lòng nhập tên người dùng',
          userGender: 'Vui lòng chọn giới tính',
          nickName: 'Vui lòng nhập biệt danh',
          userPhone: 'Vui lòng nhập số điện thoại',
          userEmail: 'Vui lòng nhập email',
          userStatus: 'Vui lòng chọn trạng thái',
          userRole: 'Vui lòng chọn vai trò',
        },
        addUser: 'Thêm người dùng',
        editUser: 'Sửa người dùng',
        gender: {
          male: 'Nam',
          female: 'Nữ',
        },
      },
    },
  },
  form: {
    required: 'Không được để trống',
    userName: {
      required: 'Vui lòng nhập tên người dùng',
      invalid: 'Định dạng tên người dùng không đúng',
    },
    phone: {
      required: 'Vui lòng nhập số điện thoại',
      invalid: 'Định dạng số điện thoại không đúng',
    },
    pwd: {
      required: 'Vui lòng nhập mật khẩu',
      invalid: 'Định dạng mật khẩu không đúng, từ 6-18 ký tự, bao gồm chữ cái, số, dấu gạch dưới',
    },
    confirmPwd: {
      required: 'Vui lòng nhập lại mật khẩu',
      invalid: 'Hai mật khẩu không khớp',
    },
    code: {
      required: 'Vui lòng nhập mã xác nhận',
      invalid: 'Định dạng mã xác nhận không đúng',
    },
    email: {
      required: 'Vui lòng nhập email',
      invalid: 'Định dạng email không đúng',
    },
  },
  dropdown: {
    closeCurrent: 'Đóng',
    closeOther: 'Đóng các tab khác',
    closeLeft: 'Đóng các tab bên trái',
    closeRight: 'Đóng các tab bên phải',
    closeAll: 'Đóng tất cả',
  },
  icon: {
    themeConfig: 'Cấu hình chủ đề',
    themeSchema: 'Chế độ chủ đề',
    lang: 'Chuyển đổi ngôn ngữ',
    fullscreen: 'Toàn màn hình',
    fullscreenExit: 'Thoát toàn màn hình',
    reload: 'Làm mới trang',
    collapse: 'Thu gọn menu',
    expand: 'Mở rộng menu',
    pin: 'Ghim',
    unpin: 'Bỏ ghim',
  },
  datatable: {
    itemCount: 'Tổng {total} bản ghi',
  },
}

export default local
