INSERT INTO category_groups
VALUES
	(gen_random_uuid(), 'Thời sự', 'Các sự kiện thời sự và tin tức chung'),
	(gen_random_uuid(), 'Công nghệ', 'Những xu hướng mới nhất về công nghệ'),
	(gen_random_uuid(), 'Kinh doanh', 'Những sự kiện liên quan đến việc kinh doanh'),
	(gen_random_uuid(), 'Thể thao', 'Tin tức về các sự kiện liên quan đến thể thao'),
	(gen_random_uuid(), 'Giải trí', 'Các thông tin liên quan đến điện ảnh, âm nhạc, văn hóa đại chúng');
	
INSERT INTO categories
VALUES
	(gen_random_uuid(), 'Tin thế giới', 'Các tin tức về những sự kiện nóng nhất toàn cầu', (SELECT id FROM category_groups WHERE name = 'Thời sự')),
	(gen_random_uuid(), 'Tin trong nước', 'Tin tức về các sự kiện tại Việt Nam', (SELECT id FROM category_groups WHERE name = 'Thời sự')),
	(gen_random_uuid(), 'Trí tuệ nhân tạo', 'Những câu chuyện về AI và sự phát triển của ngành này', (SELECT id FROM category_groups WHERE name = 'Công nghệ')),
	(gen_random_uuid(), 'Robot', 'Các tin tức mới nhất về người máy', (SELECT id FROM category_groups WHERE name = 'Công nghệ')),
	(gen_random_uuid(), 'Nông sản', 'Các tin tức về kinh doanh, buôn bán nông sản', (SELECT id FROM category_groups WHERE name = 'Kinh doanh')),
	(gen_random_uuid(), 'Hải sản', 'Các tin tức về kinh doanh, buôn bán hải sản', (SELECT id FROM category_groups WHERE name = 'Kinh doanh')),
	(gen_random_uuid(), 'Bóng đá', 'Các tin tức trong và ngoài sân cỏ', (SELECT id FROM category_groups WHERE name = 'Thể thao')),
	(gen_random_uuid(), 'Bóng rổ', 'Các tin tức về bóng rổ', (SELECT id FROM category_groups WHERE name = 'Thể thao')),
	(gen_random_uuid(), 'Esports', 'Các tin tức về thể thao điện tử', (SELECT id FROM category_groups WHERE name = 'Thể thao')),
	(gen_random_uuid(), 'Tennis', 'Các tin tức về quần vợt', (SELECT id FROM category_groups WHERE name = 'Thể thao')),
	(gen_random_uuid(), 'Các môn khác', 'Các tin tức về môn thể thao khác', (SELECT id FROM category_groups WHERE name = 'Thể thao')),
	(gen_random_uuid(), 'Âm nhạc', 'Các tin tức liên quan đến nền âm nhạc trong nước và quốc tế', (SELECT id FROM category_groups WHERE name = 'Giải trí')),
	(gen_random_uuid(), 'Điện ảnh', 'Các tin tức liên quan đến "Nghệ thuật thứ bảy"', (SELECT id FROM category_groups WHERE name = 'Giải trí')),
	(gen_random_uuid(), 'Thời trang', 'Các tin tức về mốt thời trang mới nhất', (SELECT id FROM category_groups WHERE name ='Giải trí'));
INSERT INTO users (id, username, password, role, email, fullname)
VALUES
	(gen_random_uuid(), 'root', crypt('admin', gen_salt('bf')), 'admin', 'ltphat22@clc.fitus.edu.vn','Lê Tấn Phát'),
	(gen_random_uuid(), 'writer1', crypt('writer1',gen_salt('bf')), 'writer', 'vdtan22@clc.fitus.edu.vn','Võ Duy Tân'),
	(gen_random_uuid(), 'editor1', crypt('editor1',gen_salt('bf')), 'editor', 'patuan22@clc.fitus.edu.vn','Phùng Anh Tuấn');
INSERT INTO hashtags
VALUES
	(gen_random_uuid(), 'thegioi'),
	(gen_random_uuid(), 'trongnuoc'),
	(gen_random_uuid(), 'congnghe'),
	(gen_random_uuid(), 'AI'),
	(gen_random_uuid(), 'bongda'),
	(gen_random_uuid(), 'bongro'),
	(gen_random_uuid(), 'esports'),
	(gen_random_uuid(), 'tennis'),
	(gen_random_uuid(), 'thethao'),
	(gen_random_uuid(), 'nongsan'),
	(gen_random_uuid(), 'haisan'),
	(gen_random_uuid(), 'thoitrang'),
	(gen_random_uuid(), 'amnhac'),
	(gen_random_uuid(), 'dienanh');

INSERT INTO articles (
	id, title, abstract, content, category_id, author_id, created_at
)
VALUES
	(gen_random_uuid(), 
'Triều Tiên nói Hàn Quốc đang "hỗn loạn"',
'Triều Tiên lần đầu bình luận vụ Hàn Quốc thiết quân luật, cho rằng nước này đang "hỗn loạn" và sự nghiệp của Tổng thống Yoon sẽ "sớm kết thúc".',
'<p class="normal">
"Tổng thống Yoon Suk-yeol, người đang đối mặt nguy cơ luận tội và cuộc khủng hoảng về lãnh đạo đất nước, đã gây sốc khi đột nhiên ban bố lệnh thiết quân luật và không ngần ngại sử dụng vũ lực, dẫn đến hỗn loạn trên khắp đất nước Hàn Quốc", hãng thông tấn trung ương Triều Tiên KCNA hôm nay đưa tin.
</p>
<p class="normal">
Đây là lần đầu Triều Tiên lên tiếng về tình hình Hàn Quốc kể từ khi Tổng thống Yoon Suk-yeol ra lệnh thiết quân luật đêm 3/12.
</p>
<img itemprop="contentUrl" loading="lazy" intrinsicsize="680x0" alt="Người Hàn Quốc biểu tình bên ngoài tòa nhà quốc hội ở Seoul hôm 10/12 để yêu cầu Tổng thống Yoon Suk-yeol từ chức. Ảnh: AFP" src="https://i1-vnexpress.vnecdn.net/2024/12/11/afp-20241210-36py6kr-v1-highre-2686-2327-1733884732.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=tvSPelcsAEd0qcLDZo60Xw" data-src="https://i1-vnexpress.vnecdn.net/2024/12/11/afp-20241210-36py6kr-v1-highre-2686-2327-1733884732.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=tvSPelcsAEd0qcLDZo60Xw" data-ll-status="loaded">
<p class="normal">
Truyền thông Triều Tiên cũng đề cập cuộc biểu tình quy mô lớn diễn ra sau khi phe đối lập Hàn Quốc thất bại trong nỗ lực bỏ phiếu luận tội Tổng thống Yoon tại quốc hội, trích lời những người tham gia biểu tình yêu cầu "luận tội ngay lập tức" và "trừng phạt" ông Yoon.
</p>
<p class="normal">
Giới chức Hàn Quốc chưa bình luận về các phát biểu của Triều Tiên.
</p>',
(SELECT id FROM categories WHERE name = 'Tin thế giới'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(), 
'Hà Nội tiếp tục trễ hẹn dự án vành đai 1',
'Thay vì hoàn thành vào quý I/2025, dự án vành đai 1 tiếp tục được các đơn vị liên quan hứa hoàn thành trong năm 2025 nếu có mặt bằng thi công.',
'<p class="normal">
Sáng 11/12, tại phiên tái chất vấn của HĐND thành phố, đại biểu Nguyễn Quang Thắng nêu vấn đề chậm tiến độ dự án vành đai 1, đoạn Hoàng Cầu - Voi Phục.
</p>
<p class="normal">
"Dự án có tầm quan trọng rất lớn đối với sự phát triển kinh tế xã hội của thành phố. Tại kỳ họp HĐND tháng 11/2023, lãnh đạo UBND TP Hà Nội cam kết dự án hoàn thành trong năm 2024, chậm nhất đầu năm 2025", ông Thắng nói và đề nghị chủ đầu tư, lãnh đạo hai quận Đống Đa, Ba Đình có dự án đi qua cho biết tiến độ thực hiện dự án và giải phóng mặt bằng.
</p>
<img itemprop="contentUrl" loading="lazy" intrinsicsize="680x0" alt="Hướng tuyến đường vành đai 1, đoạn Hoàng Cầu - Voi Phục. Đồ họa: Tiến Thành" "" src="https://i1-vnexpress.vnecdn.net/2024/12/11/vd1-1733891329-3329-1733891963.png?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=uXIoA8X2qlTmFgNKwoRqPQ" data-src="https://i1-vnexpress.vnecdn.net/2024/12/11/vd1-1733891329-3329-1733891963.png?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=uXIoA8X2qlTmFgNKwoRqPQ" data-ll-status="loaded">
<p class="normal">
Chủ tịch UBND quận Đống Đa Lê Tuấn Định đánh giá "vành đai 1 là dự án khó nhất của thành phố và có lẽ của cả nước". Quận có 643 trường hợp cần giải phóng mặt bằng, hiện đã có hơn 100 phương án chi trả xong. Để đẩy nhanh giải phóng mặt bằng, quận đã đưa ra 8 nhóm chính sách đặc thù và phấn đấu bàn giao trong quý I-II/2025.
</p>
<p class="normal">
Dự án vành đai 1 đoạn Hoàng Cầu - Voi Phục có tổng mức đầu tư gần 7.200 tỷ đồng từ ngân sách thành phố, trong đó chi phí giải phóng mặt bằng 5.800 tỷ đồng, xây dựng đường 636 tỷ đồng. Dự án được phê duyệt từ tháng 12/2017, dự kiến hoàn thành năm 2020, nhưng chậm tiến độ và được lùi đến năm 2025.
</p>',
(SELECT id FROM categories WHERE name = 'Tin trong nước'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Việt Nam cần đầu tư AI vào khu vực công, giáo dục',
'Giáo sư Fei-Fei Li (Mỹ) - Chủ nhân giải chính VinFuture 2024, cho rằng tác động của AI đối với xã hội là vô hạn và Việt Nam cần đầu tư vào hệ sinh thái, tích hợp vào khu vực công, giáo dục.',
'<p class="normal">
Trong bài trả lời phỏng vấn sau khi được vinh danh giải chính - VinFuture 2024 trị giá 3 triệu USD cùng với 4 nhà khoa học khác, nhà khoa học máy tính người Mỹ gốc Hoa Fei-Fei Li, 48 tuổi, Đại học Stanford đã gợi ý Việt Nam đầu tư vào hệ sinh thái trí tuệ nhân tạo (AI).
</p>
<p class="normal">
Theo Giáo sư Fei-Fei Li, AI không chỉ dành cho nhóm nhỏ tinh hoa, vài công ty hay một số ít đất nước. Đây là công nghệ dành cho mọi người, ở khắp mọi nơi. "Tôi mong được thấy các quốc gia như Việt Nam đầu tư vào hệ sinh thái AI, bởi đây là yếu tố quan trọng cho sự phát triển ngày nay", bà nói. Để làm được điều đó, cần tích hợp AI vào khu vực công, trong giáo dục, đặc biệt là từ cấp tiểu học đến trung học.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Giáo sư Fei-Fei Li. Ảnh: VinFuture" "" src="https://i1-vnexpress.vnecdn.net/2024/12/11/anh-1-1733890242-1733890254-3621-1733890344.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=JuJeLGTprpNElMd090OnIg" data-src="https://i1-vnexpress.vnecdn.net/2024/12/11/anh-1-1733890242-1733890254-3621-1733890344.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=JuJeLGTprpNElMd090OnIg" data-ll-status="loaded">
<p class="normal">
Ngoài ra, cần có nền văn hóa khởi nghiệp vững mạnh, chính sách kinh tế phù hợp để khuyến khích đổi mới sáng tạo trong AI. Đồng thời, những biện pháp kiểm soát an toàn cần được triển khai để đảm bảo AI được áp dụng một cách có trách nhiệm, đặc biệt trong lĩnh vực ảnh hưởng đến cuộc sống và sinh kế của con người.
</p>
<p class="normal">
Giáo sư Fei-Fei Li, sinh tại Thành Đô, Trung Quốc, sau đó chuyển đến Mỹ khi mới 15 tuổi. Bà học chuyên ngành vật lý, đồng thời học khoa học máy tính và kỹ thuật tại Đại học Princeton. Sự nghiệp học thuật của bà bắt đầu với vai trò là trợ lý giáo sư tại Đại học Illinois Urbana-Champaign và Đại học Princeton. Sau đó, bà gia nhập đội ngũ nhân viên tại Stanford vào năm 2009, trở thành phó giáo sư và giám đốc Phòng thí nghiệm trí tuệ nhân tạo Stanford (SAIL).
</p>
<p class="normal">
Bà có hơn 300 bài báo được bình duyệt bao gồm cả AI, học máy, học sâu, thị giác máy tính và khoa học thần kinh nhận thức.
</p>',
(SELECT id FROM categories WHERE name = 'Trí tuệ nhân tạo'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Robot hình cầu lưỡng cư hỗ trợ cảnh sát Trung Quốc tuần tra',
'Trang bị súng lưới, bình xịt hơi cay, bom khói và bộ phát sóng âm, robot RT-G có thể xử lý các mối đe dọa ở khoảng cách gần.',
'<p class="normal">
Robot hình cầu RT-G tuần tra cùng cảnh sát trong một khu thương mại ở thành phố Ôn Châu, tỉnh Chiết Giang, miền đông Trung Quốc, thu hút sự chú ý của người dân với hình dáng và chức năng hiện đại. Robot này có thể hoạt động cả trên cạn lẫn dưới nước, được phát triển bởi nhóm nghiên cứu do Wang You, phó giáo sư từ Trường Kỹ thuật và Khoa học Điều khiển thuộc Đại học Chiết Giang, dẫn đầu, ECNS hôm 10/12 đưa tin.
</p>
<p class="normal">
Trong video đăng trên mạng xã hội, RT-G tự động di chuyển trên đường mà không cần người điều khiển. Theo Wang, robot nặng 125 kg này có thể di chuyển với tốc độ lên đến 35 km/h.
</p>
<p class="normal">
Robot hình cầu là hiện tượng trên mạng xã hội và thu hút sự chú ý từ khách hàng nước ngoài. Một số khách hàng từ Trung Đông đã liên hệ với nhóm để hỏi về robot, Wang cho biết.
</p>
<p class="normal">
Hiện tại, chi phí sản xuất RT-G là khoảng 41.400 - 55.200 USD. Với sự cải tiến liên tục và chi phí giảm khi quy mô sản xuất mở rộng, Wang kỳ vọng ứng dụng của robot hình cầu sẽ mở rộng sang thiết bị gia dụng hoặc đồ chơi.
</p>',
(SELECT id FROM categories WHERE name = 'Robot'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Việt Nam nhập thịt và phụ phẩm nhiều kỷ lục',
'11 tháng, Việt Nam chi gần 1,6 tỷ USD nhập khẩu thịt và phụ phẩm, tăng 14,2% so với cùng kỳ năm ngoái - mức kỷ lục từ trước đến nay.',
'<p class="normal">
Theo số liệu sơ bộ từ hải quan, 11 tháng qua, Việt Nam đã chi tổng số tiền gần 38.000 tỷ đồng (1,55 tỷ USD), để nhập khẩu thịt, trung bình mỗi tháng khoảng 3.450 tỷ đồng. Phần lớn nguồn cung đến từ Ấn Độ, Mỹ, Nga và Đức.
</p>
<p class="normal">
Trong đó, thịt heo và gà đông lạnh, đang ngày càng được ưa chuộng do giá rẻ hơn đáng kể so với hàng nội địa. Thống kê cho thấy giá thịt heo nhập khẩu dao động 52.000-62.000 đồng một kg, chỉ bằng khoảng một nửa giá thịt heo trong nước, vốn ở mức 80.000-180.000 đồng một kg. Hàng nhập khẩu được các quán ăn, nhà hàng và khu công nghiệp ưu tiên nhập để giảm chi phí.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Thịt heo nhập khẩu. Ảnh: thitnhapkhau" "" src="https://i1-kinhdoanh.vnecdn.net/2024/12/09/screen-shot-2024-12-09-at-3-54-8521-2787-1733734673.png?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=xdPmmr-LHP84cdzfvO5G7g" data-src="https://i1-kinhdoanh.vnecdn.net/2024/12/09/screen-shot-2024-12-09-at-3-54-8521-2787-1733734673.png?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=xdPmmr-LHP84cdzfvO5G7g" data-ll-status="loaded">
<p class="normal">
Tuy nhiên, việc tăng cường nhập khẩu thịt cũng tiềm ẩn nhiều nguy cơ về an toàn thực phẩm. Theo Cục Thú y, tháng 5 đến tháng 9, trong số 6.679 lô hàng thịt nhập được kiểm tra, hơn 1% lô hàng bị phát hiện nhiễm vi khuẩn Salmonella (gây bệnh đường ruột) và đã bị loại bỏ. Điều này cho thấy nếu không có các biện pháp kiểm soát và giám sát chặt chẽ, nguy cơ ảnh hưởng đến sức khỏe người tiêu dùng là rất lớn.
</p>
<p class="normal">
Nhập khẩu thịt giá rẻ đang mang lại nhiều lựa chọn hơn cho người tiêu dùng nhưng đồng thời cũng đặt ra thách thức không nhỏ cho ngành chăn nuôi trong nước, cũng như yêu cầu khắt khe hơn trong quản lý chất lượng và an toàn thực phẩm.
</p>',
(SELECT id FROM categories WHERE name = 'Nông sản'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Dị ứng hải sản có được tiêm vaccine?',
'Cơ địa tôi dị ứng hải sản (tôm, cua), có được tiêm vaccine sởi, sốt xuất huyết, cúm không thưa bác sĩ? (Như Mai, 30 tuổi, TP Thủ Đức).',
'<p class="normal">
Trả lời:
</p>
<p class="normal">
Hải sản là thực phẩm bổ dưỡng được nhiều người yêu thích, song cũng gây ra không ít phiền toái như dị ứng, đau bụng, tiêu chảy... Người dị ứng hải sản không nên ăn hoặc hạn chế. Lý do, có thể dẫn đến đầy bụng, rối loạn tiêu hóa, mẩn đỏ, ngứa toàn thân. Nặng hơn là khó thở, tím tái, hoảng loạn, mạch nhanh, hạ huyết áp, nguy cơ đe dọa tính mạng.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Hải sản là món ngon được nhiều người ưa chuộng. Ảnh: Vecteezy" "" src="https://i1-suckhoe.vnecdn.net/2024/12/03/di-ung-hai-san-co-tiem-duoc-va-4838-5740-1733217147.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=EkpIPoaASOVkp1OLoPBvTw" data-src="https://i1-suckhoe.vnecdn.net/2024/12/03/di-ung-hai-san-co-tiem-duoc-va-4838-5740-1733217147.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=EkpIPoaASOVkp1OLoPBvTw" data-ll-status="loaded">
<p class="normal">
Bạn hoàn toàn có thể tiêm vaccine cúm, sởi và sốt xuất huyết. Bác sĩ sẽ khám sàng lọc trước khi tiêm. Tuy nhiên, bạn cần cung cấp đầy đủ thông tin tình trạng sức khỏe, cơ địa dị ứng hải sản ra sao, đang uống thuốc gì... để bác sĩ chỉ định loại vaccine phù hợp
</p>
<p class="normal">
Lưu ý, trước và sau tiêm không nên ăn hải sản bởi thực phẩm có thể gây ra hiện tượng dị ứng như ngứa ngáy, da nổi mẩn đỏ, khó phân biệt nguyên nhân từ thức ăn hay phản ứng của vaccine.
</p>
<p class="normal">
Cục Y tế dự phòng khuyến cáo thời tiết chuyển lạnh, độ ẩm tăng cao dễ tạo điều kiện cho vi khuẩn, virus, nấm mốc sinh sôi. Ngoài tiêm vaccine, để tránh mắc bệnh, mọi người cần ăn uống đủ chất, vận động thường xuyên, hạn chế bị muỗi chích, rửa tay thường xuyên, mang khẩu trang khi đến nơi đông người...
</p>',
(SELECT id FROM categories WHERE name = 'Hải sản'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Những kỷ lục khó bị phá ở ASEAN Cup',
'Kể từ lần đầu được tổ chức năm 1996, giải đấu số một Đông Nam Á chứng kiến rất nhiều kỷ lục đáng nhớ.',
'
<img src="https://iv1.vnecdn.net/thethao/images/web/2024/12/10/nhung-ky-luc-kho-bi-pha-o-asean-cup-1733827462.jpg?w=0&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=jOfUMO-MWN5CjyAOeLjfIA" alt="Những kỷ lục khó bị phá ở ASEAN Cup" >
<p class="normal">
Đội bóng thành công nhất ASEAN Cup là Thái Lan, với bảy lần vô địch sau 14 lần giải được tổ chức. Họ đã vào chung kết 10 lần và đăng quang ở bốn trong năm kỳ ASEAN Cup gần đây nhất.
</p>
<p class="normal">
Người thành công nhất cũng đến từ Thái Lan, tiền đạo lừng danh một thời Kiatisak Senamuang – người đã có ba lần vô địch ASEAN Cup với tư cách cầu thủ (1996, 2000, 2002) và hai lần với tư cách huấn luyện viên (2014, 2016). Kiatisak cũng được bầu là cầu thủ giá trị nhất (MVP) tại Tiger Cup (tiền thân của ASEAN Cup) năm 2000.
</p>
<p class="normal">
Cầu thủ thành công nhất lịch sử là tiền vệ Sarach Yooyen cũng của Thái Lan, với bốn lần đăng quang ở sân chơi này tại ASEAN Cup 2014, 2016, 2020 và 2022. Xứ Chùa Vàng còn đóng góp cầu thủ ghi bàn nhiều lịch sử ASEAN Cup, là tiền đạo huyền thoại Teerasil Dangda với 25 bàn.
</p>
<p class="normal">
HLV thành công nhất là Radojko Avramovic. Ông giúp Singapore ba lần vô địch vào các năm 2004, 2007 và 2012.
</p>',
(SELECT id FROM categories WHERE name = 'Bóng đá'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Chung kết giải bóng rổ trẻ 2024 - trận đấu mãn nhãn người xem',
'THPT Phan Đình Phùng thi đấu xuất sắc và giành ngôi vô địch ở cả hai trận chung kết nội dung nam và nữ Giải bóng rổ trẻ năm 2024.',
'<p class="normal">
Màn thể hiện của hai đội trong trận chung kết Giải bóng rổ trẻ 2024 được giới chuyên môn đánh giá đã vượt ra khỏi trình độ học sinh THPT.
</p>
<p class="normal">
Chiều 25/11 tại Nhà thi đấu Cầu Giấy, trận đại chiến giữa THPT Nguyễn Trãi – Ba Đình và THPT Phan Đình Phùng đã khép lại với ngôi vô địch gọi tên Phan Đình Phùng. Mặc dù nằm trong khuôn khổ giải học sinh, những gì hai đội biểu hiện được các cầu thủ chuyên nghiệp và trọng tài giải quốc gia đánh giá xuất sắc cả về trình độ chuyên môn lẫn tinh thần thi đấu.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Phan Đình Phùng (áo vàng) và Nguyễn Trãi - Ba Đình (áo hồng) nhập cuộc đầy khí thế. Ảnh: YBL" "" src="https://i1-thethao.vnecdn.net/2024/11/25/lth-7944-jpg-1732525075-9350-1732525182.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=owIulPNQ7KfXJY9kA2bR2g" data-src="https://i1-thethao.vnecdn.net/2024/11/25/lth-7944-jpg-1732525075-9350-1732525182.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=owIulPNQ7KfXJY9kA2bR2g" data-ll-status="loaded">
<p class="normal">
Hai đội đều có những danh thủ đang thi đấu và tập luyện ở các đội tuyển bóng rổ chuyên nghiệp tại giải toàn quốc. Tiêu biểu như số 1 Nguyễn Đình Minh của Phan Đình Phùng và số 6 Phạm Nam Anh của THPT Nguyễn Trãi – Ba Đình, cùng một số cầu thủ trẻ khác.
</p>
<p class="normal">
Ngay từ hiệp một, không khí trên sân đã rất nóng với các màn luận chuyển công – thủ liên tục, ăn miếng trả miếng giữa hai đội. Tuy nhiên, đội có màn nhập sân ấn tượng hơn là Phan Đình Phùng. Có đội hình được đánh giá toàn diện và đồng đều hơn, các cầu thủ áo vàng phối hợp ăn ý, sớm mở tỉ số và vươn lên dẫn trước khá xa trong hiệp đầu.
</p>
<p class="normal">
Không khí trận đấu thay đổi khá nhiều trong hiệp 3 và hiệp 4. Nguyễn Trãi – Ba Đình sau những hội ý chiến thuật hiệu quả đã chơi khởi sắc hơn trong các pha phản công và đột phá, phối hợp bài bản và dàn rộng hơn thay vì chỉ tập trung vào chủ công Nam Anh, khiến Phan Đình Phùng chuyển sang phương án thủ box toàn sân. Điều này tạo cơ hội cho số 6 của Nguyễn Trãi – Ba Đình có nhiều khoảng trống hơn để tấn công và ghi điểm. Tuy nhiên, Phan Đình Phùng cũng không để đối thủ thu hẹp khoảng cách mà cũng tích cực phản công ghi bàn, không hề tử thủ giữ lợi thế.
</p>
<p class="normal">
Hai đội dường như không còn quan tâm về kết quả trận đấu mà chỉ muốn thể hiện tất cả khả năng của mình, cống hiến cho khán giả một trận đấu thật đẹp. Về cuối trận đấu, Nguyễn Trãi – Ba Đình xuống sức và không đủ khả năng kéo lại trận đấu. Với khả năng rebound (bắt bóng bật bảng) tốt hơn và những pha ném rổ 3 điểm xuất thần, các cầu thủ Phan Đình Phùng ấn định tỉ số 50-30, qua đó lên ngôi vô địch giải đấu.
</p>',
(SELECT id FROM categories WHERE name = 'Bóng rổ'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Legion Esports thắng áp đảo tại chung kết Mobile Legends: Bang Bang',
'Sau gần 3 giờ thi đấu, đội Legion Esports giành chiến thắng tuyệt đối, trở thành Quán quân giải vô địch quốc gia Mobile Legends: Bang Bang, chiều 20/10.',
'<p class="normal">
Chiều 20/10, trận chung kết Mobile Legends: Bang Bang đã diễn ra tại nhà Nhà văn hóa Sinh viên Thủ Đức (TP HCM). Mobile Legends: Bang Bang là game di động thuộc thể loại Multiplayer Online Battle Arena (MOBA), phát triển bởi công ty Moonton, ra mắt năm 2016. Trong Mobile Legends, hai đội gồm 5 người chơi sẽ đối đầu với nhau trên một bản đồ cổ điển 3 đường (lanes), mục tiêu chính là phá hủy căn cứ chính của đối thủ.
</p>
<img itemprop="contentUrl" loading="lazy" intrinsicsize="1200x0" alt="" src="https://i1-thethao.vnecdn.net/2024/10/20/dfb7c720389481cad885-1729421096-1729421241-1729422222.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=eWullPr7uUkrL8emkjWiVQ" data-src="https://i1-thethao.vnecdn.net/2024/10/20/dfb7c720389481cad885-1729421096-1729421241-1729422222.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=eWullPr7uUkrL8emkjWiVQ" data-ll-status="loaded">
<p class="normal">
Trải qua nhiều vòng thi, T Final và Legion Esports là hai đội xuất sắc bước vào trận chung kết. Trận đấu theo thể thức Best-of-7 (BO7), gồm tối đa 7 trận đấu, đội nào thắng 4 trận sẽ giành chiến thắng chung cuộc. Thể thức Best-of-7 không chỉ đòi hỏi kỹ năng, mà còn là thử thách về tinh thần bền bỉ và khả năng thích ứng chiến thuật.
</p>
<p class="normal">
Ngay từ đầu trận, Legion Esports đã áp đảo hoàn toàn đối thủ. Chỉ chưa đầy 2 phút, họ đã vươn lên dẫn trước với chỉ số mạng đấu 6-0. Trong một đợt giao tranh, Legion Esports đã "quét sạch" toàn bộ đội hình T Final, chỉ với 3 thành viên.
</p>
<p class="normal">
T Final gần như không có cơ hội kéo trận đấu sang giai đoạn giữa. Sau 5 phút thi đấu, thành viên Hehe của Legion Esports đã tích lũy được 5.000 vàng, tạo ra cách biệt khá lớn với nhân vật còn lại, là thành viên chủ lực của đội.
</p>
<p class="normal">
T Final nhanh chóng đuối sức trước những pha tấn công dồn dập từ phía đối thủ. Sau 5 phút thi đấu, T Final không thể theo kịp nhịp độ trận đấu, dần mất kiểm soát trước sự áp đảo của Legion Esports và bị đẩy vào thế phòng thủ bị động. Trận đấu nhanh chóng nghiêng về phía Legion Esports.
</p>
<p class="normal">
Dần dần, Legion Esports lại một lần nữa chiếm ưu thế và tiếp tục kiểm soát trận đấu với sự vượt trội cả về chiến thuật lẫn kỹ năng cá nhân. Trong ảnh, hai thành viên T Final tập trung chiến đấu bảo vệ căn cứ ở lượt cuối cùng.
</p>
<p class="normal">
Sau gần 3 giờ thi đấu, Legion Esports đã giành chiến thắng tuyệt đối, trở thành nhà vô địch. Đội Quán quân sẽ nhận giải thưởng 100 triệu đồng, Á quân 50 triệu đồng.
</p>',
(SELECT id FROM categories WHERE name = 'Esports'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Djokovic bắt đầu mùa mới cuối năm nay',
'Tay vợt số bảy thế giới Novak Djokovic xác nhận sẽ dự Brisbane International để bắt đầu mùa giải 2025.',
'<p class="normal">
Djokovic trở lại sân đấu ở sự kiện ATP 250 được đăng cai ở Brisbane, diễn ra từ 29/12 đến 5/1 tại Trung tâm Quần vợt Queensland. Lần thứ hai anh tranh tài ở giải đấu này, sau mùa 2009. Cách đây 15 năm, Djokovic là hạt giống số một nhưng bị loại ngay vòng một khi thua Ernests Gulbis.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Djokovic không dự sự kiện chính thức nào trong gần hai tháng qua. Ảnh: Reuters" "" src="https://i1-thethao.vnecdn.net/2024/12/06/84cb0750-b20a-11ef-a7e9-e72ab6-2164-7874-1733449231.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=uJXMk-QBIlSM25EEykPrPw" data-src="https://i1-thethao.vnecdn.net/2024/12/06/84cb0750-b20a-11ef-a7e9-e72ab6-2164-7874-1733449231.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=uJXMk-QBIlSM25EEykPrPw" data-ll-status="loaded">
<p class="normal">
Nếu cải thiện thành tích và đăng quang, Djokovic sẽ đoạt danh hiệu thứ 100 trong sự nghiệp. Trong lịch sử, chỉ có hai tay vợt khác từng chạm cột mốc này là Jimmy Connors (109 danh hiệu) và Roger Federer (103). Ở mùa giải 2024, thành tựu duy nhất của Djokovic là tấm HC vàng Olympic Paris.
</p>
<p class="normal">
Theo kế hoạch, Djokovic sẽ đến Melbourne dự Australia Mở rộng sau khi hoàn thành giải đấu ở Brisbane. Tại Grand Slam đầu tiên trong năm, anh đang giữ kỷ lục 10 lần vô địch.
</p>
<p class="normal">
Trong hai tháng gần đây, Djokovic nhận lời đánh giao hữu ở giải Six Kings Slam, nơi anh đánh bại Rafael Nadal để giành vị trí thứ ba. Tiếp đến, Djokovic xuất hiện ở sự kiện tri ân Juan Martin del Potro hôm 1/12 và đấu biểu diễn để chia tay sự nghiệp của nhà vô địch Mỹ Mở rộng 2009.
</p>
<p class="normal">
Trở lại ATP Tour tại Brisbane International, Djokovic tranh tài với ĐKVĐ Grigor Dimitrov, á quân Holger Rune cùng tay vợt Mỹ Frances Tiafoe. Đáng chú ý, sự kiện này đánh dấu màn tái xuất được chờ đợi của Nick Kyrgios sau thời gian dài rời xa sân đấu. Tay vợt 29 tuổi không thi đấu kể từ tháng 6/2023 vì chấn thương.
</p>',
(SELECT id FROM categories WHERE name = 'Tennis'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Đinh Lập Nhân gỡ hòa ở chung kết cờ vua thế giới 2024',
'Một ngày sau khi bị dẫn trước, đương kim vô địch Đinh Lập Nhân thắng ván 12 để cân bằng tỷ số với Gukesh tại chung kết thế giới.',
'<p class="normal">
Kỳ thủ Trung Quốc cầm quân trắng, chọn khai cuộc Anh cho ván đấu gần như buộc phải thắng. Anh áp đảo người thách đấu suốt ván đấu, tận dụng triệt để ưu thế về không gian và vị trí quân để thắng sau 39 nước cờ. Đòn kết liễu của đương kim vô địch là một nước thí xe để chiếu hết sau 7 nước.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Đinh Lập Nhân trong ván 12 thắng Gukesh Dommaraju tại chung kết cờ vua thế giới ở Singapore tối 9/12/2024. Ảnh: FIDE" "" src="https://i1-thethao.vnecdn.net/2024/12/09/dinh-la-p-nha-n-gukesh-1733762-4409-2367-1733762974.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=_wX02-UJtCrGNEHPNVHfGg" data-src="https://i1-thethao.vnecdn.net/2024/12/09/dinh-la-p-nha-n-gukesh-1733762-4409-2367-1733762974.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=_wX02-UJtCrGNEHPNVHfGg" data-ll-status="loaded">
<p class="normal">
Sau nước cờ này, Gukesh bắt tay xin thua luôn. Kỳ thủ Ấn Độ chống khuỷu tay lên bàn, ôm mặt một hồi lâu. Sau khi thắng ván 11 tối 8/12, anh chỉ cần hòa ba ván cuối để trở thành nhà vô địch cờ vua thế giới trẻ nhất lịch sử, ở tuổi 18. Tuy nhiên ngay ở ván sau đó, anh bị gỡ hòa và trận đấu lại trở về vạch xuất phát trước ngày nghỉ cuối cùng.
</p>
<p class="normal">
Đinh thì thở phào nhẹ nhõm sau ván thắng quan trọng, khi anh chấp nhận đánh mạo hiểm ngay từ trung cuộc. Theo kỳ thủ số ba thế giới Hikaru Nakamura, các cao thủ thường đánh với đúng thực lực trong tình thế buộc phải thắng và mạo hiểm. Trong phần lớn trận đấu, Đinh thường đánh cầu toàn, nhưng ở ván này anh không còn gì để mất.
</p>
<p class="normal">
Tại ván 12 ở trận chung kết năm ngoái tại Kazakhstan, Đinh cũng cầm quân trắng và thắng Ian Nepomniachtchi để cân bằng tỷ số 6-6. Sau đó, anh hòa hai ván tiêu chuẩn còn lại rồi thắng trong loạt tie-break cờ nhanh. Kỳ thủ Trung Quốc có thể sẽ có lợi thế hơn nếu trận đấu năm nay vào tie-break một lần nữa.
</p>
<p class="normal">
Ván cờ tiêu chuẩn áp chót sẽ diễn ra từ 16h thứ Tư 11/12, giờ Hà Nội, khi Gukesh cầm quân trắng lần cuối. Còn ván tiêu chuẩn cuối diễn ra sau đó một ngày, khi Đinh có lợi thế cầm trắng. Theo các trận tranh ngôi gần đây, khi tỷ số cân bằng trước hai ván cuối, các kỳ thủ sẽ cố gắng chơi an toàn bởi một sai lầm có thể khiến họ phải trả giá ngay lập tức bằng thất bại chung cuộc.
</p>',
(SELECT id FROM categories WHERE name = 'Các môn khác'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Nhạc sĩ Huy Tuấn: "8Wonder là điểm hẹn của sao quốc tế"',
'Charlie Puth, Maroon 5 và Imagine Dragons lần lượt khuấy động nhạc hội 8Wonder, mở đường cho sao quốc tế đến Việt Nam trong tương lai, theo nhạc sĩ Huy Tuấn.',
'<p class="normal">
"Imagine Dragons thể hiện trên cả tuyệt vời. Ban nhạc đưa chúng tôi trở lại với loạt hit đã thuộc nằm lòng. Không khí lẫn khán giả hôm ấy rất cuồng nhiệt", nhạc sĩ Huy Tuấn nói. Anh là một trong 20.000 fan có mặt tại sân khấu ngoài trời ở Vinhomes Grand Park, TP Thủ Đức, tối 8/12.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Biển người cổ vũ Imagine Dragons. Ảnh: Thanh Tùng - Trần Quỳnh" "" src="https://i1-giaitri.vnecdn.net/2024/12/11/z6110819797347-aabd5a37ba3ace8-2607-1651-1733891668.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=IKO8gPRHlNaAbuPLHeEbIg" data-src="https://i1-giaitri.vnecdn.net/2024/12/11/z6110819797347-aabd5a37ba3ace8-2607-1651-1733891668.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=IKO8gPRHlNaAbuPLHeEbIg" data-ll-status="loaded">
<p class="normal">
Theo đại diện ban tổ chức, lượng khán giả theo dõi trực tiếp và trực tuyến tăng đột biến, phá kỷ lục lượt xem của 8Wonder từ trước đến nay. Ngay khi VinWonder công bố dàn sao, khán giả liên tục bàn luận và chia sẻ thông tin, giúp từ khóa "8Wonder" hay "Imagine Dragons" vào top tìm kiếm trên mạng xã hội gần hai tháng qua.
</p>
<p class="normal">
Ngoài khả năng hát live được ví như thu âm, nhóm rock Mỹ còn ghi điểm với phong cách trình diễn phóng khoáng, tận hưởng, như đang "dạo chơi" với âm nhạc. Nhạc sĩ Huy Tuấn ấn tượng trước hiệu ứng sân khấu, lúc tuyết rơi, rực lửa, khi pháo hoa rợp trời, giúp dàn sao thăng hoa hơn.
</p>
<p class="normal">
Nhạc sĩ cho rằng người trong nghề không quá bất ngờ khi 8Wonder có thể "bắt tay" loạt sao Âu - Mỹ. Trong hai mùa, Vingroup chi bộn tiền đưa loạt sao đương đại đến Việt Nam, từ Imagine Dragons, Charlie Puth đến Maroon 5.
</p>
<p class="normal">
"8Wonder dần trở thành thương hiệu lớn và uy tín. Nghệ sĩ ngoại sẽ có cái nhìn khác về cách tổ chức chuyên nghiệp, văn minh của chúng ta. Một phần nhờ ban tổ chức có suy nghĩ lớn, chịu chơi lẫn tầm vóc để hiện thực hóa giấc mơ", ca sĩ Tùng Dương nói.
</p>
<p class="normal">
Để Việt Nam trở thành điểm hẹn quen thuộc của các ngôi sao toàn cầu, giới chuyên môn lẫn nghệ sĩ Việt cho rằng cần có sự chủ động, chung tay của những doanh nghiệp đầu tàu.
</p>
<p class="normal">
"Văn hóa luôn là đầu tàu, mũi nhọn để có thể giới thiệu hình ảnh một đất nước. Điều Vingroup đang làm với 8Wonder và loạt lễ hội khác là tín hiệu khả quan, đáng hoan nghênh", nhạc sĩ Huy Tuấn nói thêm.
</p>',
(SELECT id FROM categories WHERE name = 'Âm nhạc'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Lý Hải hướng dẫn Lê Tuấn Khang diễn xuất',
'Đạo diễn Lý Hải hướng dẫn TikToker Lê Tuấn Khang diễn xuất tại nhà riêng, sau khi giao cho anh vai đầu tay trong "Lật mặt 8".',
'<p class="normal">
Anh cùng Lê Tuấn Khang và dàn diễn viên tập thoại, kịch bản trước khi bấm máy ở bối cảnh đầu tiên tại Ninh Thuận. Phần mới quy tụ đông đảo gương mặt trẻ, ít kinh nghiệm diễn xuất, do đó đạo diễn khởi động dự án sớm hơn hai tháng so với các phim trước.
</p>
<img itemprop="contentUrl"  loading="lazy" intrinsicsize="680x0" alt="Lý Hải trao đổi đường dây tâm lý nhân vật cho Tuấn Khang trước khi bấm máy dự án. Ảnh: Tuấn Lê" "" src="https://i1-giaitri.vnecdn.net/2024/12/10/tuan-khang-2-1411-1733827850.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=Gzs6M0XNmaC6SmMxVpP2cw" data-src="https://i1-giaitri.vnecdn.net/2024/12/10/tuan-khang-2-1411-1733827850.jpg?w=680&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=Gzs6M0XNmaC6SmMxVpP2cw" data-ll-status="loaded">
<p class="normal">
Một trong những điểm khác biệt ở Lật mặt 8: Vòng tay nắng là yếu tố âm nhạc chiếm 30% kịch bản. Theo anh, ở vòng casting, nhiều tên tuổi diễn tốt nhưng không được nhận vai vì không có khả năng vũ đạo. Do đó, ngoài hướng dẫn diễn viên thoại, biểu cảm, anh nhờ biên đạo rèn thêm ở kỹ năng nhảy. "Tôi đề nghị các bạn trẻ tập nhuần nhuyễn để ra trường quay không mất thời gian", Lý Hải nói.
</p>
<p class="normal">
Lý Hải cho biết lúc gặp Tuấn Khang ở vòng thử vai giữa tháng 10, anh ấn tượng với diễn xuất tự nhiên của chàng trai, song chưa biết TikToker là ai. Đạo diễn để Tuấn Khang tùy chọn một trích đoạn trong kịch bản, tự do sáng tạo với phân cảnh. Từ đó, Lý Hải thấy được ưu, nhược điểm của anh và giao vai phù hợp. Nhà sản xuất nói không ngại "mời TikToker đóng phim" vì vốn có kinh nghiệm chọn diễn viên ở các phần trước. "Tôi tự tin có thể giúp họ diễn ăn rơ, không bị "chỏi" khi đứng cạnh các nghệ sĩ kỳ cựu", anh cho biết.
</p>
<p class="normal">
Lê Tuấn Khang 22 tuổi, quê Sóc Trăng, từng theo gia đình làm công việc đồng áng. Sau này, anh lên TP HCM làm thuê ở công ty gỗ, chạy xe ôm công nghệ. Năm 2021, Covid-19 bùng phát, anh về quê, thực hiện những đoạn video ngắn, ghi lại cuộc sống ở miền Tây sông nước và dần nổi tiếng. Đầu tháng 10, anh từ quê nhà lên TP HCM thử vai cho phim Lý Hải, sau khi được người quen, khán giả khuyến khích đi đóng phim. Thời gian qua, cụm từ "đám giỗ bên cồn" lọt vào top xu hướng tìm kiếm trên mạng xã hội, do được Lê Tuấn Khang nhắc nhiều lần trong các video.
</p>
<p class="normal">
Lật mặt 8 pha trộn nhiều thể loại, từ hài, tâm lý - tình cảm đến hành động. Phim lấy bối cảnh ở TP HCM, Vĩnh Hy, Phan Rang - Tháp Chàm (Ninh Thuận), Long An, dự kiến ra mắt mùa phim 30/4 năm sau.
</p>',
(SELECT id FROM categories WHERE name = 'Điện ảnh'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now()),
	(gen_random_uuid(),
'Giới trẻ Việt theo đuổi mốt trang điểm "bling bling"',
'Nhiều học sinh, sinh viên trong nước theo mốt bôi nhũ, gắn đá lấp lánh lên mặt, tết tóc thắt nơ đi xem concert, đi chơi.',
'<p class="normal">
Hai concert Anh trai say hi ngày 7 và 9/12 tại sân Mỹ Đình thu hút khoảng 60.000 khán giả, trong đó có nhiều bạn trẻ. Đa số họ chọn quần áo mang phong cách Y2K, hip hop chịu ảnh hưởng của những thần tượng Kpop.
</p>
<img itemprop="contentUrl" loading="lazy" intrinsicsize="1200x0" alt="" src="https://i1-giaitri.vnecdn.net/2024/12/11/Hinh-khan-gia-truoc-concert-Day-4-17-1733885973.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=kComI2Mr67TuM4fETBhiyg" data-src="https://i1-giaitri.vnecdn.net/2024/12/11/Hinh-khan-gia-truoc-concert-Day-4-17-1733885973.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=kComI2Mr67TuM4fETBhiyg" data-ll-status="loaded">
<p class="normal">
Áo sweatshirt, chân váy ngắn, tất ống, quần cargo, áo quây, áo khoác sequin, sneakers, crop top, áo bomber, jacket da là những món đồ đặc trưng tạo nên phong cách Y2K. Khán giả Đinh Hương, 17 tuổi, cho biết thường mua các thiết kế này trên sàn thương mại điện tử với giá vài trăm nghìn đồng.
</p>
<p class="normal">
Bên cạnh quần áo, kiểu mốt này còn lăng xê các loại kẹp tóc, buộc tóc hình nơ. Ngoài kẹp tóc với giá 6.000-10.000 đồng một chiếc, một số bạn mua ruy băng ngoài cửa hàng lưu niệm để tự thắt nơ trên các bím tóc. Trong các màu sắc, hồng, trắng và đen là ba màu được mọi người yêu thích hơn cả vì dễ dùng.
</p>
<img itemprop="contentUrl" loading="lazy" intrinsicsize="1200x0" alt="" src="https://i1-giaitri.vnecdn.net/2024/12/11/DSC0761-1733885971.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=iWlIaU0_8zpXL1kFSsYEtQ" data-src="https://i1-giaitri.vnecdn.net/2024/12/11/DSC0761-1733885971.jpg?w=1200&amp;h=0&amp;q=100&amp;dpr=1&amp;fit=crop&amp;s=iWlIaU0_8zpXL1kFSsYEtQ" data-ll-status="loaded">
<p class="normal">
Các ca sĩ Hàn Quốc lăng xê mốt này từ năm 2018. Sau concert Blackpink tại Việt Nam năm ngoái, cơn sốt này càng được giới trẻ Việt yêu thích và theo đuổi từ đó tới nay, do tên fandom của nhóm là Blink - đồng âm với bling. Vài năm qua, một số người nổi tiếng trong nước như Amee, Chi Pu, Ngọc Trinh cũng chọn phong cách này trên sân khấu hoặc các buổi chụp hình thời trang.
</p>',
(SELECT id FROM categories WHERE name = 'Thời trang'),
(SELECT id FROM users WHERE role = 'writer' AND username = 'writer1'),
now());

INSERT INTO article_tag
VALUES 
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Triều Tiên nói Hàn Quốc đang "hỗn loạn"'),
	(SELECT id FROM hashtags WHERE tag_name='thegioi')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Hà Nội tiếp tục trễ hẹn dự án vành đai 1'),
	(SELECT id FROM hashtags WHERE tag_name='trongnuoc')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Việt Nam cần đầu tư AI vào khu vực công, giáo dục'),
	(SELECT id FROM hashtags WHERE tag_name='AI')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Robot hình cầu lưỡng cư hỗ trợ cảnh sát Trung Quốc tuần tra'),
	(SELECT id FROM hashtags WHERE tag_name='congnghe')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Việt Nam nhập thịt và phụ phẩm nhiều kỷ lục'),
	(SELECT id FROM hashtags WHERE tag_name='nongsan')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Dị ứng hải sản có được tiêm vaccine?'),
	(SELECT id FROM hashtags WHERE tag_name='haisan')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Những kỷ lục khó bị phá ở ASEAN Cup'),
	(SELECT id FROM hashtags WHERE tag_name='bongda')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Chung kết giải bóng rổ trẻ 2024 - trận đấu mãn nhãn người xem'),
	(SELECT id FROM hashtags WHERE tag_name='bongro')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Legion Esports thắng áp đảo tại chung kết Mobile Legends: Bang Bang'),
	(SELECT id FROM hashtags WHERE tag_name='esports')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Djokovic bắt đầu mùa mới cuối năm nay'),
	(SELECT id FROM hashtags WHERE tag_name='tennis')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Đinh Lập Nhân gỡ hòa ở chung kết cờ vua thế giới 2024'),
	(SELECT id FROM hashtags WHERE tag_name='thethao')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Nhạc sĩ Huy Tuấn: "8Wonder là điểm hẹn của sao quốc tế"'),
	(SELECT id FROM hashtags WHERE tag_name='amnhac')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Lý Hải hướng dẫn Lê Tuấn Khang diễn xuất'),
	(SELECT id FROM hashtags WHERE tag_name='dienanh')),
	(gen_random_uuid(), 
	(SELECT id FROM articles WHERE title='Giới trẻ Việt theo đuổi mốt trang điểm "bling bling"'),
	(SELECT id FROM hashtags WHERE tag_name='thoitrang'));


INSERT INTO settings DEFAULT VALUES;
