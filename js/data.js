/**
 * VIỆT PHỤC REMIX - DỮ LIỆU VĂN HÓA & TRANG PHỤC DI SẢN
 * Chứa đầy đủ thông tin chuẩn xác về các thời kỳ lịch sử, vùng miền,
 * phục trang các triều đại, bảng màu ngũ hành và quy tắc gợi ý nhã nhặn.
 */

const VIET_PHUC_DATA = {
  // 1. Thước phim dòng chảy lịch sử
  eras: [
    {
      id: 'hung-vuong',
      period: 'Thời Hùng Vương (Văn Lang - Âu Lạc)',
      time: 'Khoảng TK VII TCN - TK III TCN',
      title: 'Khởi Sinh Nền Văn Minh Sông Hồng',
      desc: 'Trang phục thời kỳ đầu dựng nước mang đậm dấu ấn văn hóa Đông Sơn. Nam cởi trần đóng khố, nữ mặc váy quấn và yếm hoặc áo ngắn xẻ ngực. Vải dệt từ sợi gai, đay kết hợp trang sức lông chim, vỏ ốc, hoa văn chim Lạc, cá sấu cách điệu trên đồ đồng.',
      highlights: ['Áo vỏ cây & vải sợi gai thô', 'Mũ lông chim trang nghiêm', 'Họa tiết chim Lạc & mặt trời Đông Sơn', 'Trang sức khuyên tai đá, vòng đồng'],
      silhouette: 'van-lang',
      imageAlt: 'Văn Lang phục sức'
    },
    {
      id: 'ly-tran',
      period: 'Thời Lý - Trần',
      time: 'Thế kỷ XI - XIV',
      title: 'Đại Việt Tự Chủ - Hào Khí Đông A',
      desc: 'Thời kỳ quốc gia độc lập rực rỡ, Phật giáo phát triển cực thịnh. Y phục thanh nhã, quý phái với áo Giao Lĩnh (cổ chéo vạt lớn), áo Viên Lĩnh (cổ tròn tay thụng rộng), kết hợp hoa văn hoa cúc dây, rồng thời Lý uốn lượn mềm mại và mây cuộn sóng nước.',
      highlights: ['Áo Giao Lĩnh vạt chéo thư thái', 'Áo Viên Lĩnh tay thụng uy nghiêm', 'Họa tiết cúc dây, hoa sen thời Lý', 'Vải tơ tằm dệt hoa lộng lẫy'],
      silhouette: 'giao-linh',
      imageAlt: 'Trang phục Lý Trần'
    },
    {
      id: 'le-so',
      period: 'Thời Lê Sơ - Hậu Lê',
      time: 'Thế kỷ XV - XVIII',
      title: 'Quy Chuẩn Điển Lễ & Nho Phong',
      desc: 'Thời kỳ Nho giáo đặt nền tảng định chế trang phục chặt chẽ. Xuất hiện quy chế phẩm phục triều đình nghiêm cẩn: Bổ phục thêu cầm thú theo phẩm hàm, áo Giao Lĩnh, Đối Khâm quý phái cho nữ quý tộc, áo cổ thìa trang trọng cho bậc danh sĩ.',
      highlights: ['Áo Đối Khâm khoác ngoài duyên dáng', 'Bổ tử thêu chim thú chỉ định phẩm vị', 'Họa tiết thủy ba sóng nước & vân mây tam sơn', 'Khăn quấn, hài thêu quý tộc'],
      silhouette: 'doi-kham',
      imageAlt: 'Trang phục Lê Sơ'
    },
    {
      id: 'nguyen',
      period: 'Thời Triều Nguyễn',
      time: '1802 - 1945',
      title: 'Đỉnh Cao Điển Chế & Áo Dài Tiền Thân',
      desc: 'Triều đại hoàn thiện hệ thống lễ phục với Áo Nhật Bình danh giá cho hoàng gia nữ quyến, Áo Tấc cho tầng lớp quý tộc sĩ phu trong đại lễ, và Áo Ngũ Thân tay chẽn bình dị nhưng mẫu mực định hình nên cốt cách người Việt khắp 3 miền.',
      highlights: ['Áo Nhật Bình hoa văn bát bửu ngũ sắc', 'Áo Tấc tay thụng lễ nghi tôn kính', 'Áo Ngũ Thân 5 nút biểu trưng ngũ thường', 'Khăn đóng, khăn xếp chỉn chu'],
      silhouette: 'nhat-binh',
      imageAlt: 'Trang phục Triều Nguyễn'
    },
    {
      id: 'the-ky-20',
      period: 'Đầu - Giữa Thế Kỷ XX',
      time: 'Thập niên 1930 - 1960',
      title: 'Làn Sóng Cách Tân Nghệ Thuật',
      desc: 'Giai đoạn chuyển mình rực rỡ khi họa sĩ Cát Tường sáng tạo áo dài Lemur (1934), tiếp nối là áo dài Lê Phổ và áo dài bà Nhu (cổ thuyền phóng khoáng năm 1958). Tà áo tôn vinh đường cong thiếu nữ Việt, hòa quyện giữa tinh thần Á Đông và kỹ thuật âu phục.',
      highlights: ['Áo dài Lemur tay bồng, viền lá sen', 'Áo dài Lê Phổ ôm nhẹ thanh thoát', 'Áo dài cổ thuyền tân thời', 'Nón bài thơ xứ Huế, guốc gỗ gót son'],
      silhouette: 'ao-dai-lemur',
      imageAlt: 'Áo dài cách tân thế kỷ 20'
    },
    {
      id: 'duong-dai',
      period: 'Việt Phục Đương Đại (Gen Z Remix)',
      time: 'Thế kỷ XXI',
      title: 'Hơi Thở Thời Đại - Di Sản Tái Sinh',
      desc: 'Giới trẻ Việt Nam phục hưng văn hóa cổ truyền với phong trào diện Việt phục: Nhật Bình, Giao Lĩnh, Tấc kết hợp cùng thời trang dạo phố, phụ kiện hiện đại, biến di sản trăm năm thành phong cách sống đầy kiêu hãnh của thế hệ mới.',
      highlights: ['Phối Việt phục dạo phố tân thời', 'Chất liệu lụa tơ sống, tơ sen bảo vệ môi trường', 'Bảng màu pastel ngọt ngào, tinh tế', 'Tự tin bước ra thế giới'],
      silhouette: 'ao-dai-hien-dai',
      imageAlt: 'Việt phục đương đại'
    }
  ],

  // 2. Vùng miền (3 Miền Tổ Quốc)
  regions: {
    bac: {
      id: 'bac',
      name: 'Miền Bắc (Đông Đô - Kinh Bắc)',
      tone: 'chàm ngọc - nâu đồng cổ kính',
      bgClass: 'bg-region-bac',
      patterns: 'Trống đồng Đông Sơn, hoa sen Lý - Trần, gốm men lam',
      desc: 'Cái nôi ngàn năm văn hiến với nét đằm thắm của áo Tứ Thân, nón quai thao, dải yếm đào và nếp áo dài Ngũ Thân thanh lịch đất Tràng An.',
      signatureColors: ['#1e3d59', '#3a6073', '#e8d5b5', '#8a2be2'],
      recommendedOutfits: ['tu-than', 'giao-linh', 'ngu-than-nam']
    },
    trung: {
      id: 'trung',
      name: 'Miền Trung (Xứ Huế Thần Kinh)',
      tone: 'vàng cung đình - đỏ bã trầu sen',
      bgClass: 'bg-region-trung',
      patterns: 'Vân mây triều Nguyễn, đài sen cung đình, sóng thủy ba bát bửu',
      desc: 'Mảnh đất kinh kỳ hoa lệ lưu giữ tinh hoa triều Nguyễn: Áo Nhật Bình rực rỡ ngũ sắc, Áo Tấc trang nghiêm chốn hương từ và nón bài thơ nghiêng vành.',
      signatureColors: ['#a91b2e', '#f39c12', '#fce4ec', '#4a154b'],
      recommendedOutfits: ['nhat-binh', 'ao-tac-nam', 'ao-tac-nu']
    },
    nam: {
      id: 'nam',
      name: 'Miền Nam (Sông Nước Miệt Vườn)',
      tone: 'xanh lục mạ - vàng phù sa',
      bgClass: 'bg-region-nam',
      patterns: 'Sóng nước Cửu Long, bông lúa chín vàng, hoa sen ngọc',
      desc: 'Vùng đất phương Nam phóng khoáng nghĩa tình với chiếc áo Bà Ba lụa mềm bay trong gió, khăn rằn mộc mạc và chiếc nón lá chở che nắng dãi mưa dầm.',
      signatureColors: ['#2e7d32', '#fbc02d', '#8d6e63', '#80deea'],
      recommendedOutfits: ['ao-ba-ba', 'ngu-than-nam', 'ao-dai-tan-thoi']
    }
  },

  // 3. Hoàn cảnh / Sự kiện
  events: [
    {
      id: 'le-chua',
      name: 'Đi lễ chùa cầu an',
      desc: 'Thanh tịnh, trang nghiêm nơi cửa thiền linh thiêng.',
      tone: 'Tĩnh tại, thanh khiết',
      formalLevel: 'trang_nghiem'
    },
    {
      id: 'den-hung',
      name: 'Trẩy hội Đền Hùng (10/3)',
      desc: 'Hướng về cội nguồn dựng nước non sông gấm vóc.',
      tone: 'Hùng tráng, tự hào dân tộc',
      formalLevel: 'le_hoi_truyen_thong'
    },
    {
      id: 'chup-tet',
      name: 'Chụp ảnh Tết cổ truyền',
      desc: 'Đón xuân đoàn viên, rạng rỡ sắc xuân trăm hoa đua nở.',
      tone: 'Tươi vui, rạng rỡ, may mắn',
      formalLevel: 'hoi_xuan'
    },
    {
      id: 'dai-yen',
      name: 'Đại yến tiệc cung đình',
      desc: 'Chốn hoàng cung thâm nghiêm yến tiệc triều nghi văn võ.',
      tone: 'Vương giả, quyền quý, cung đình',
      formalLevel: 'cung_dinh_cao_nhat'
    },
    {
      id: 'dao-pho',
      name: 'Dạo phố tân thời',
      desc: 'Phong thái trẻ trung, hiện đại dung hòa hồn cốt di sản.',
      tone: 'Thanh lịch, năng động, duyên dáng',
      formalLevel: 'doi_thuong_thoi_trang'
    }
  ],

  // 4. Bảng màu Ngũ Hành (Nhuộm sắc y phục)
  elements: [
    {
      id: 'kim',
      name: 'Hành Kim (Bạch Kim)',
      symbol: 'Trắng Ngọc & Ánh Vàng',
      hexPrimary: '#f8f9fa',
      hexSecondary: '#d4af37',
      hexBorder: '#e6ca65',
      accentColor: '#bcaaa4',
      textColor: '#2c3e50',
      meaning: 'Tượng trưng cho sự tinh khiết, minh triết, cương trực và phúc lộc thanh khiết nơi cội nguồn vương giả.'
    },
    {
      id: 'moc',
      name: 'Hành Mộc (Thanh Mộc)',
      symbol: 'Xanh Ngọc & Lục Trúc',
      hexPrimary: '#2e7d32',
      hexSecondary: '#81c784',
      hexBorder: '#1b5e20',
      accentColor: '#a5d6a7',
      textColor: '#ffffff',
      meaning: 'Biểu trưng cho sức sống đâm chồi nảy lộc, lòng nhân từ trắc ẩn và sự sinh sôi trường tồn của vạn vật đất trời.'
    },
    {
      id: 'thuy',
      name: 'Hành Thủy (Huyền Thủy)',
      symbol: 'Chàm Lam & Xanh Biển',
      hexPrimary: '#1565c0',
      hexSecondary: '#64b5f6',
      hexBorder: '#0d47a1',
      accentColor: '#90caf9',
      textColor: '#ffffff',
      meaning: 'Đại diện cho trí tuệ sâu thẳm, sự linh hoạt uyển chuyển như dòng nước mẹ chở che bến bờ non nước.'
    },
    {
      id: 'hoa',
      name: 'Hành Hỏa (Xích Hỏa)',
      symbol: 'Đỏ Điều & Hồng Sen',
      hexPrimary: '#c62828',
      hexSecondary: '#ef5350',
      hexBorder: '#8e0000',
      accentColor: '#ff8a80',
      textColor: '#ffffff',
      meaning: 'Ngọn lửa lễ nghi, lòng nhiệt huyết quả cảm, điềm lành thịnh vượng và rực rỡ huy hoàng trong các đại lễ cung đình.'
    },
    {
      id: 'tho',
      name: 'Hành Thổ (Hoàng Thổ)',
      symbol: 'Vàng Hoàng Gia & Nâu Đất',
      hexPrimary: '#f9a825',
      hexSecondary: '#ffe082',
      hexBorder: '#c17900',
      accentColor: '#fff59d',
      textColor: '#3e2723',
      meaning: 'Màu của đất mẹ bao dung, sự đôn hậu vững chãi, trung tâm ngũ hành và vương quyền tối thượng của vua chúa phương Nam.'
    }
  ],

  // 5. Kho trang phục chính
  outfits: [
    {
      id: 'nhat-binh',
      name: 'Áo Nhật Bình',
      gender: 'female',
      era: 'Triều Nguyễn (1802 - 1945)',
      heritageName: 'Nhật Bình Thường Phục Cung Vi',
      desc: 'Thường phục cao quý của Hoàng Thái Hậu, Hoàng Hậu, Công chúa và Cung tần triều Nguyễn. Đặc trưng bởi cổ áo xẻ bản to trước ngực ghép hình chữ nhật, trang trí hoa văn rồng phụng lượn mây, viền ngũ sắc tượng trưng cho ngũ hành và dải thùy lưu thướt tha.',
      patterns: 'Cổ áo hình chữ nhật ngũ sắc, hoa văn phụng ổ, sóng nước thủy ba tam sơn, dải kết ngũ hành.',
      icon: '👘',
      svgType: 'nhat_binh'
    },
    {
      id: 'ao-tac-nu',
      name: 'Áo Tấc Nữ (Tay Thụng)',
      gender: 'female',
      era: 'Thời Hậu Lê & Triều Nguyễn',
      heritageName: 'Đại Lễ Phục Áo Tấc Quý Nữ',
      desc: 'Là một dạng áo ngũ thân nhưng may ống tay thụng dài rộng đến một tấc (khoảng 40cm), vạt áo dài quá gối, cài khuy sang bên phải. Thường được các mệnh phụ phu nhân diện trong tế tự tổ tiên, nghênh hôn gia lễ và yến tiệc trang nghiêm.',
      patterns: 'Cổ đứng đoan trang, tay áo thụng rộng buông dài thanh nhã, chất liệu lụa vân sa thêu hoa chìm.',
      icon: '👘',
      svgType: 'ao_tac_nu'
    },
    {
      id: 'ao-tac-nam',
      name: 'Áo Tấc Nam (Lễ Phục)',
      gender: 'male',
      era: 'Thời Triều Nguyễn',
      heritageName: 'Áo Tấc Lễ Phục Sĩ Phu',
      desc: 'Lễ phục truyền thống tôn nghiêm của nam giới quý tộc và nho sĩ triều Nguyễn. Tay thụng rộng thênh thang tượng trưng cho lòng dạ khoáng đạt bao la, thể hiện phẩm hạnh khiêm nhường, kính cẩn trước tổ tiên và bề trên.',
      patterns: 'Thân ngũ thân nối vạt, tay rộng một tấc buông thõng uy nghi, cổ đứng cao kín đáo.',
      icon: '🥋',
      svgType: 'ao_tac_nam'
    },
    {
      id: 'giao-linh',
      name: 'Áo Giao Lĩnh',
      gender: 'both',
      era: 'Thời Lý - Trần - Lê Sơ',
      heritageName: 'Giao Lĩnh Thường Phục Cổ Xa',
      desc: 'Một trong những cổ phục lâu đời nhất của người Việt, vạt áo chéo sang bên phải đè lên nhau tạo thành hình chữ V thanh thoát. Thường may tay thụng hoặc tay thường, mặc phối cùng thường (váy quây) hoặc quần dài, toát lên phong thái tiên phong đạo cốt.',
      patterns: 'Vạt chéo đối xứng mềm mại, thắt lưng lụa thả dài, hoa văn cúc dây và vân mây thời Lý.',
      icon: '🥋',
      svgType: 'giao_linh'
    },
    {
      id: 'doi-kham',
      name: 'Áo Đối Khâm',
      gender: 'female',
      era: 'Thời Lý - Trần - Hậu Lê',
      heritageName: 'Đối Khâm Nữ Quý Phục',
      desc: 'Áo có hai vạt song song buông thẳng trước ngực, không cài khuy mà để hở lộ yếm đào hoặc áo lót bên trong, thường thắt đai dải lụa ngang eo. Trang phục toát lên vẻ yểu điệu, kiêu sa của các tiểu thư khuê các chốn đế đô ngàn năm.',
      patterns: 'Hai vạt áo đối xứng thêu hoa mẫu đơn, đai lưng ngọc thắt nơ dài duyên dáng.',
      icon: '👘',
      svgType: 'doi_kham'
    },
    {
      id: 'ngu-than-nam',
      name: 'Áo Ngũ Thân Tay Chẽn',
      gender: 'male',
      era: 'Thời Chúa Nguyễn & Vua Minh Mạng',
      heritageName: 'Ngũ Thân Tay Chẽn Quân Tử',
      desc: 'Được định hình từ thời chúa Nguyễn Phúc Khoát và hoàn thiện thời vua Minh Mạng, áo gồm 5 thân (4 thân ngoài tượng trưng tứ thân phụ mẫu, thân con bên trong tượng trưng cho chính mình) và 5 chiếc khuy cài tượng trưng cho ngũ thường: Nhân - Lễ - Nghĩa - Trí - Tín.',
      patterns: 'Cổ đứng 3 phân cài 5 khuy ngọc/đồng, tay áo chẽn gọn gàng, vạt cong hình cánh cung.',
      icon: '🥋',
      svgType: 'ngu_than_nam'
    },
    {
      id: 'tu-than',
      name: 'Áo Tứ Thân Kinh Bắc',
      gender: 'female',
      era: 'Văn hóa Dân gian Bắc Bộ',
      heritageName: 'Tứ Thân Nữ Quan Họ',
      desc: 'Biểu tượng bình dị mà quyến rũ của người phụ nữ nông thôn Bắc Bộ và liền chị quan họ Kinh Bắc. Áo có 4 vạt, 2 vạt trước buông lơi hoặc buộc lại trước bụng, bên trong phối yếm đào, thắt lưng lụa xanh biếc và dải yếm lấp ló kín đáo.',
      patterns: 'Yếm đào hoa sen, áo tứ thân lụa the mỏng nhẹ, dải thắt lưng xanh màu lá mạ.',
      icon: '👘',
      svgType: 'tu_than'
    },
    {
      id: 'ao-ba-ba',
      name: 'Áo Bà Ba Nam Bộ',
      gender: 'both',
      era: 'Thế kỷ XIX - Hiện đại',
      heritageName: 'Bà Ba Lụa Sông Nước',
      desc: 'Bộ trang phục gắn liền với tâm hồn đôn hậu, hào sảng của người dân đất phương Nam. Cổ tròn thanh tú, xẻ tà hai bên hông tạo sự thoải mái, may bằng lụa gấm mềm mát hoặc vải ú đen bền bỉ theo năm tháng.',
      patterns: 'Nút thắt ngọc hoặc nút bọc vải, túi vuông hai bên vạt áo, phối cùng quần lụa đen chấm gót.',
      icon: '👚',
      svgType: 'ao_ba_ba'
    },
    {
      id: 'ao-dai-tan-thoi',
      name: 'Áo Dài Tân Thời / Lemur',
      gender: 'female',
      era: 'Thập niên 1930 - Hiện đại',
      heritageName: 'Áo Dài Nghệ Thuật Cách Tân',
      desc: 'Khởi nguồn từ cuộc cách tân của họa sĩ Lemur Cát Tường năm 1934, áo dài ôm nhẹ tôn vinh đường nét duyên dáng của người phụ nữ Việt Nam, kết hợp cổ sen, tay bồng và tà lụa thướt tha chạm gót giầy.',
      patterns: 'Tà áo dài lượn sóng, chiết eo thon thả, hoa sen vẽ tay hoặc thêu chìm trang nhã.',
      icon: '👗',
      svgType: 'ao_dai_tan_thoi'
    },
    {
      id: 'van-lang',
      name: 'Trang Phục Văn Lang Thuở Sơ Khai',
      gender: 'both',
      era: 'Thời Hùng Vương (Văn Lang)',
      heritageName: 'Văn Lang Thổ Phục Cổ Sơ',
      desc: 'Tái hiện trang phục thời đại các Vua Hùng dựng nước: Khố dệt thổ cẩm đính chuỗi hạt, áo giáp da hoặc vải gai đan cài lông chim hạc, mang đậm khí thiêng sông núi thuở bình minh dân tộc.',
      patterns: 'Họa tiết hình học ziczac, chim Lạc bay về hướng mặt trời, hoa văn vòng xoáy ốc.',
      icon: '🪶',
      svgType: 'van_lang'
    }
  ],

  // 6. Phụ kiện mũ / khăn đội đầu
  headwears: [
    {
      id: 'khan-dong-nam',
      name: 'Khăn Đóng / Khăn Xếp Nam',
      gender: 'male',
      desc: 'Khăn vấn nhiều nếp hình chữ Nhất (-) hoặc chữ Nhân (人) phía trước trán, biểu trưng cho lòng nhân hậu và sự đĩnh đạc của đấng quân tử.',
      icon: '👑'
    },
    {
      id: 'khan-van-nu',
      name: 'Khăn Vấn Vành Nữ',
      gender: 'female',
      desc: 'Khăn nhung hoặc gấm quấn tròn quanh đầu tạo nét mặt phúc hậu, thanh tú cho người phụ nữ trong các ngày trọng đại.',
      icon: '👑'
    },
    {
      id: 'non-quai-thao',
      name: 'Nón Quai Thao (Ba Tầm)',
      gender: 'female',
      desc: 'Chiếc nón tròn phẳng như vầng trăng rằm, viền lá buông tỉ mỉ đan cài quai thao bằng lụa tím hoặc thao đen buông dài ngực áo.',
      icon: '👒'
    },
    {
      id: 'mu-phung',
      name: 'Mũ Phụng Triều Đình',
      gender: 'female',
      desc: 'Mũ miện dát vàng chạm chim phụng ngậm chuỗi ngọc lưu ly, dành riêng cho bậc Hoàng Hậu, Công chúa trong các ngày đại lễ triều đình.',
      icon: '👑'
    },
    {
      id: 'non-la',
      name: 'Nón Lá Xứ Huế / Bình Dân',
      gender: 'both',
      desc: 'Chiếc nón lá chóp nhọn giản dị, che mưa che nắng, soi bóng bài thơ khi soi dưới ánh nắng mặt trời.',
      icon: '👒'
    },
    {
      id: 'mu-long-chim',
      name: 'Mũ Lông Chim Văn Lang',
      gender: 'both',
      desc: 'Vương miện đan bằng vỏ cây cài lông chim bồ nông hoặc chim trĩ vươn cao, biểu trưng cho quyền uy thủ lĩnh thuở Hùng Vương.',
      icon: '🪶'
    },
    {
      id: 'none',
      name: 'Tóc Búi / Tự Nhiên Không Mũ',
      gender: 'both',
      desc: 'Tóc buông xõa tự nhiên hoặc búi cài trâm ngọc nhẹ nhàng tinh khôi.',
      icon: '✨'
    }
  ],

  // 7. Phụ kiện cầm tay & Giày hài
  accessories: [
    {
      id: 'quat-lua',
      name: 'Quạt Xếp Lụa Thêu Sen',
      desc: 'Quạt lụa gấm nan trúc thêu nhành hoa sen và đôi bướm, biểu trưng cho sự thanh nhã và phong vận tao nhã.',
      icon: '🪭'
    },
    {
      id: 'the-bai',
      name: 'Thẻ Bài Ngọc Bội',
      desc: 'Ngọc bội bạch ngọc khắc chữ cát tường và thắt nút cát cánh may mắn, mang lại vượng khí cho chủ nhân.',
      icon: '📿'
    },
    {
      id: 'trap-go',
      name: 'Tráp Trầu Khảm Xà Cừ',
      desc: 'Chiếc tráp gỗ sơn then khảm ốc xà cừ đựng trầu cau - đầu câu chuyện nghĩa tình dân tộc.',
      icon: '📦'
    },
    {
      id: 'canh-sen',
      name: 'Nhành Sen Hồng Cung Đình',
      desc: 'Bông sen hồng biểu tượng quốc hoa thanh khiết, gần bùn mà chẳng hôi tanh mùi bùn.',
      icon: '🪷'
    },
    {
      id: 'hai-theu',
      name: 'Hài Thêu Mũi Cong Hoàng Gia',
      desc: 'Đôi hài lụa thêu chỉ vàng hình hoa văn mây cuộn và mũi cong hình mỏ phượng quý phái.',
      icon: '🩰'
    },
    {
      id: 'guoc-moc',
      name: 'Guốc Mộc Quai Nhung',
      desc: 'Đôi guốc gỗ mộc mạc gõ lách cách nhịp vui trên đường làng ngõ xóm xưa.',
      icon: '👡'
    },
    {
      id: 'none',
      name: 'Không Mang Phụ Kiện',
      desc: 'Thanh thoát, giản dị không kèm phụ kiện cầu kỳ.',
      icon: '✨'
    }
  ],

  // 8. Hệ thống Quy tắc Cảnh Báo Lịch Thiệp
  advisoryRules: [
    {
      id: 'nhat-binh-non-la',
      condition: (state) => state.outfit === 'nhat-binh' && state.headwear === 'non-la',
      type: 'warning',
      message: 'Gợi ý nhã nhặn: Áo Nhật Bình là thường phục tôn quý chốn hoàng cung triều Nguyễn. Phối cùng Khăn Vành hoặc Mũ Phụng sẽ tôn trọn vẻ quyền quý, uy nghiêm thay vì nón lá bình dân bạn nhé!'
    },
    {
      id: 'ba-ba-dai-yen',
      condition: (state) => state.outfit === 'ao-ba-ba' && state.event === 'dai-yen',
      type: 'warning',
      message: 'Gợi ý nhã nhặn: Chiếc Áo Bà Ba mộc mạc rất đẹp nơi đồng quê miệt vườn sông nước. Bước vào Đại yến tiệc cung đình nguy nga, một tà Áo Tấc hoặc Nhật Bình lộng lẫy sẽ chuẩn mực điển lễ hơn đấy!'
    },
    {
      id: 'van-lang-dao-pho',
      condition: (state) => state.outfit === 'van-lang' && state.event === 'dao-pho',
      type: 'warning',
      message: 'Gợi ý hóm hỉnh: Bạn đang mang tinh thần dũng mãnh thời Hùng Vương xuyên không dạo phố! Nếu muốn dạo phố chuẩn tân thời duyên dáng, hãy thử một tà Áo Dài tân thời hoặc Áo Ngũ Thân xem sao nhé!'
    },
    {
      id: 'nhat-binh-dai-yen-match',
      condition: (state) => state.outfit === 'nhat-binh' && state.event === 'dai-yen' && (state.headwear === 'mu-phung' || state.headwear === 'khan-van-nu'),
      type: 'praise',
      message: 'Khen ngợi tuyệt mỹ: Sự kết hợp hoàn hảo tuyệt đỉnh! Khí chất vương giả của áo Nhật Bình hòa quyện cùng khăn vành/mũ phụng giữa chốn cung đình thâm nghiêm toát trọn vẻ đài các trang nhã!'
    },
    {
      id: 'tu-than-quai-thao-match',
      condition: (state) => state.outfit === 'tu-than' && state.headwear === 'non-quai-thao',
      type: 'praise',
      message: 'Gợi ý tâm đắc: Đậm đà phong vị Kinh Bắc! Chiếc nón quai thao trăng rằm cùng tà áo tứ thân e ấp gợi nhớ câu ca quan họ "người ơi người ở đừng về".'
    },
    {
      id: 'ngu-than-khan-dong-match',
      condition: (state) => state.outfit === 'ngu-than-nam' && state.headwear === 'khan-dong-nam',
      type: 'praise',
      message: 'Chuẩn mực văn nhân: Áo Ngũ Thân kết hợp cùng khăn đóng chữ Nhân thể hiện trọn vẹn đức khiêm nhường, phong thái đĩnh đạc của bậc quân tử đất Việt.'
    },
    {
      id: 'van-lang-den-hung-match',
      condition: (state) => state.outfit === 'van-lang' && state.event === 'den-hung',
      type: 'praise',
      message: 'Hồn thiêng sông núi: Trang phục Văn Lang rực sáng giữa ngày giỗ Tổ 10/3, hào khí nghìn năm dựng nước non sông bừng nở!'
    }
  ],

  // 9. Trích dẫn văn hóa và thơ ca cho Thiệp Postcard
  culturalQuotes: [
    {
      quote: 'Dẫu qua ngàn năm dâu bể đổi thay, vạt áo năm thân vẫn ôm trọn tấm lòng đôn hậu người Việt.',
      author: 'Lời xưa ngẫm lại'
    },
    {
      quote: 'Áo bay lồng lộng gió muôn phương, ngẩng đầu trông lại bóng quê hương rạng ngời.',
      author: 'Khơi Nguồn Dân Tộc'
    },
    {
      quote: 'Sen vàng nở giữa triều nghi, ngàn hoa dâng sắc bóng hình non sông.',
      author: 'Khúc ca cung đình'
    },
    {
      quote: 'Nón quai thao nghiêng vành duyên dáng, áo tứ thân lấp ló nụ cười duyên.',
      author: 'Dân ca Quan họ'
    },
    {
      quote: 'Mỗi tà áo ta khoác lên hôm nay là một nhịp cầu nối liền quá khứ nghìn năm rạng rỡ.',
      author: 'Việt Phục Remix'
    }
  ]
};

if (typeof window !== 'undefined') {
  window.VIET_PHUC_DATA = VIET_PHUC_DATA;
}
