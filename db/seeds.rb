puts "=====================SEED====================="
puts "== CreateUsers: seeding ======================"
admin = User.create(name:"miriya", email:"miriya.lee@gmail.com", role:"admin", status:"running", password:"1111", password_confirmation:"1111")

puts "== CreateEvents: seeding ======================"
event_camp1 = Event.create(title:"1st. UX Camp Seoul", starts_at: "2010-02-27", ends_at: "2010-02-27")
  date_c1 = event_camp1.starts_at.strftime("%Y-%m-%d")
event_sym = Event.create(title:"UX Symphosium", starts_at: "2010-11-08", ends_at: "2010-11-08")
  date_e1 = event_sym.starts_at.strftime("%Y-%m-%d")
event_camp2 = Event.create(title:"2nd. UX Camp Seoul", starts_at: "2010-02-26", ends_at: "2010-02-26")
  date_c2 = event_camp2.starts_at.strftime("%Y-%m-%d")
event_camp3 = Event.create(title:"3rd. UX Camp Seoul", starts_at: "2011-11-26", ends_at: "2011-11-26")
  date_c3 = event_camp3.starts_at.strftime("%Y-%m-%d")
event_camp4 = Event.create(title:"4th. UX Camp Seoul", starts_at: "2012-07-14", ends_at: "2012-07-14")
  date_c4 = event_camp4.starts_at.strftime("%Y-%m-%d")
  roomc41 = Room.create(name: "1번방", event_id: event_camp4.id)
  roomc42 = Room.create(name: "2번방", event_id: event_camp4.id)
  roomc43 = Room.create(name: "3번방", event_id: event_camp4.id)
  roomc44 = Room.create(name: "4번방", event_id: event_camp4.id)

puts "== CreateEvents: photo uploading ======================"
source_path = "#{::Rails.root.to_s}/public/seed/event_photos"
candidates = Dir.glob("#{source_path}/*.*")
candidates.each do |fullpath|
	begin
		puts "--- Trying file: #{fullpath}"
		extname = File.extname(fullpath)
		basename = File.basename(fullpath)
		filename = basename.gsub(extname, '')
    event = Event.find(filename)
    event.update_attributes(:poster => File.open(fullpath))
    event.save      
    puts "> #{event.poster.current_path}"
	rescue Exception => e
		puts e.message
		next
	end
end


puts "== CreatePrograms: seeding ======================"
period1 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 10:00")
  Program.create(period_id: period1.id, title:"등록 및 입장(4층)")

period2 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 11:00")
  Program.create(period_id: period2.id, title:"오프닝")

period3 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 11:55")
  Program.create(period_id: period3.id, title:"점심식사 (지하 1층 푸드코드 이용)")

period4 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 13:10")
  pc441 = Program.create(period_id: period4.id, room_id: roomc41.id, title:"바캠프 #1-1")
  pc442 = Program.create(period_id: period4.id, room_id: roomc42.id, title:"바캠프 #1-2")
  pc443 = Program.create(period_id: period4.id, room_id: roomc43.id, title:"Leaving Flatland : Pervasive Information Architecture", content: "Infomation Architecture의 역사를 간단히 서술하고 최근 논의 되고 있는 Cross-channel 전략과 이에 대한 방법론을 쉽진 않지만 간단히 알려드리는 시간입니다.")
    Speaker.create(name:"김병환", link:"https://www.facebook.com/kaidomo", event_id: event_camp4.id, program_id: pc443.id)
  pc444 = Program.create(period_id: period4.id, room_id: roomc44.id, title:"Designing Auditory Experience", content: "우리는 아침에 눈을 뜨면서부터 잠자리에 들기 전까지 수많은 소리들을 접하게 됩니다. 하지만 그 모든 소리가 의미있거나 기억 속에 저장되는 것은 아닙니다. 몇년이 지나도 기억에 남아있는 소리는 어떤 것이 있을까요? 어떤 소리를 다시 들었을 때 연관된 무엇인가가 떠오르는 때는 언제였나요? 그 이유는 무엇일까요? 작은 전자기기부터 브랜드나 특정 공간에 있어서까지 널리 활용되는 Auditory Experience Design에 대해 알아보고 이에 대해 함께 이야기 나누고자 합니다.")
    Speaker.create(name:"박도영", event_id: event_camp4.id, program_id: pc444.id)

period5 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 14:00")
  pc451 = Program.create(period_id: period5.id, room_id: roomc41.id, title:"Improv for Prototyping", content: "프로토타이핑 도구로 즉흥연기를 활용하여 UX 설계, 검증, 통찰 얻기")
    Speaker.create(name:"김창준", link:"http://agile.egloos.com/", event_id: event_camp4.id, program_id: pc451.id)
  pc452 = Program.create(period_id: period5.id, room_id: roomc42.id, title:"이노UX #1", content: "- 은행/증권 점포 UX 방향성 논의 - 매직 미러 UX 방향성 논의")
    Speaker.create(name:"최병호", link:"http://twitter.com/ilovehci", event_id: event_camp4.id, program_id: pc452.id)
  Program.create(period_id: period5.id, room_id: roomc43.id, title:"바캠프 #2-3")
  pc454 = Program.create(period_id: period5.id, room_id: roomc44.id, title:"Sound and Touch Issues in UX (1)", content: "사용자로서의 인간은 다양한 감각을 통해 환경, 그리고 환경 속 존재들과 상호작용하며 생존,생활,문화,기술 등을 이뤄갑니다. 통합적인 사용자경험(UX)을 고려한다면, 시각 위주의 정보뿐 아니라 청각이나 촉각과 같은 감각정보들이 어떻게 다뤄져야할지 같이 고민해봐야 하지 않을까요? 사용자경험은 매우 넓은 의미에서 다뤄질 수 있습니다. 그래서 이 세션에서는 영화, 게임, 가전제품 등에서의 사운드와 터치에 대해 이야기해볼까합니다.")
    Speaker.create(name:"이주환", link:"https://www.facebook.com/juhwan.lee.796", event_id: event_camp4.id, program_id: pc454.id)
    Speaker.create(name:"이동환", event_id: event_camp4.id, program_id: pc454.id)

period6 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 14:50")
  pc461 = Program.create(period_id: period6.id, room_id: roomc41.id, title:"UX Method Recipe - UX 방법론을 초심자에게 어떻게 알려줄까?", content: "서울대학교 융합대학원 사용자 경험 랩에서 UX 초심자에게 UX 방법론을 알려주기 위해 고민했던 과정과 그 결과를 공유합니다.")
    Speaker.create(name:"최진한", event_id: event_camp4.id, program_id: pc461.id)
    Speaker.create(name:"오창훈", event_id: event_camp4.id, program_id: pc461.id)
  pc462 = Program.create(period_id: period6.id, room_id: roomc42.id, title:"이노UX #2", content: "- B2C 웹사이트와 B2B 솔루션의 UX 방향성 논의 - 온라인 쇼핑몰의 41가지 UX 가이드라인")
    Speaker.create(name:"최병호", link:"http://twitter.com/ilovehci", event_id: event_camp4.id, program_id: pc462.id)
  pc463 = Program.create(period_id: period6.id, room_id: roomc43.id, title:"동네 병원의 새로운 건강 경험 디자인", content: "지난 3회 유엑스캠프에서 발표한 제너럴닥터의 의 오픈 프로젝트로써 동네 병원의 새로운 모델을 디자인하고 있는 Health eXperience Design 워크숍의 결과물을 공유합니다.")
    Speaker.create(name:"김승범", link:"http://hxd.generaldoctor.co.kr/", event_id: event_camp4.id, program_id: pc463.id)
    Speaker.create(name:"유상준", event_id: event_camp4.id, program_id: pc463.id)
    Speaker.create(name:"박주연", event_id: event_camp4.id, program_id: pc463.id)
    Speaker.create(name:"한종수", event_id: event_camp4.id, program_id: pc463.id)
    Speaker.create(name:"장준혁", event_id: event_camp4.id, program_id: pc463.id)
  pc464 = Program.create(period_id: period6.id, room_id: roomc44.id, title:"Sound and Touch Issues in UX (2)", content: "사용자로서의 인간은 다양한 감각을 통해 환경, 그리고 환경 속 존재들과 상호작용하며 생존,생활,문화,기술 등을 이뤄갑니다. 통합적인 사용자경험(UX)을 고려한다면, 시각 위주의 정보뿐 아니라 청각이나 촉각과 같은 감각정보들이 어떻게 다뤄져야할지 같이 고민해봐야 하지 않을까요? 사용자경험은 매우 넓은 의미에서 다뤄질 수 있습니다. 그래서 이 세션에서는 영화, 게임, 가전제품 등에서의 사운드와 터치에 대해 이야기해볼까합니다.")
    Speaker.create(name:"이주환", link:"https://www.facebook.com/juhwan.lee.796", event_id: event_camp4.id, program_id: pc464.id)
    Speaker.create(name:"이동환", event_id: event_camp4.id, program_id: pc464.id)

period7 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 15:40")
  pc471 = Program.create(period_id: period7.id, room_id: roomc41.id, title:"개발도상국 정보 기술 소외 청소년을 위한 현지 조사 방법", content: "서울대학교 융합대학원 사용자경험연구실의 인도 웨스트뱅갈지역 청소년 대상 기술봉사 project 내용과 그 방법론. IDEO의 HCD방법론을 기초로 한 커스터마이징. 실습을 통해 방법론 일부를 체험할 수 있음!")
    Speaker.create(name:"표민기", link:"https://www.facebook.com/pyo.mingi", event_id: event_camp4.id, program_id: pc471.id)
    Speaker.create(name:"정영찬", link:"https://www.facebook.com/ychello", event_id: event_camp4.id, program_id: pc471.id)
  pc472 = Program.create(period_id: period7.id, room_id: roomc42.id, title:"이노UX #3", content: "- 공공 기부 온라인 웹사이트 UX 방향성 논의 - UX 탄생 그리고 UX로 무엇을 추구할 것인가?")
    Speaker.create(name:"최병호", link:"http://twitter.com/ilovehci", event_id: event_camp4.id, program_id: pc472.id)
  pc473 = Program.create(period_id: period7.id, room_id: roomc43.id, title:"만드는 사람들의 UX", content: "UX, CX 등 최근의 화두가 되는 개념들의 대상은 언제나 사용자입니다. 많은 개발 방법론과 디자인 방법론들이 사용자를 얘기합니다. 하지만 정작 만드는 사람들이 행복하지 않다면 어떨까요? 저는 만드는 사람들이 행복해야 진정 좋은 UX나 CX에 도달할 수 있다고 믿습니다. 이 세션은 발표나 강연이 아닌 서로의 생각을 나누고 얘기를 하고자 하는 세션입니다.")
    Speaker.create(name:"송홍진", link:"http://murianwind.blogspot.kr/", event_id: event_camp4.id, program_id: pc473.id)
  pc474 = Program.create(period_id: period7.id, room_id: roomc44.id, title:"시각적으로 감성 평가하기", content: "더 나은 UX를 제공하려고 노력하는 UX디자이너의 경험은 어떠한가요? UX와 UXDX의 관계와 어떻게 우리들의 경험을 개선할 수 있을지에 대해 이야기 나누어 보고자 합니다.")
    Speaker.create(name:"박진녕", link:"https://www.facebook.com/jinnyoung.park", event_id: event_camp4.id, program_id: pc474.id)

period8 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 16:30")
  Program.create(period_id: period8.id, title:"클로징")

period9 = Period.create(event_id: event_camp4.id, starts_at: "#{date_c4} 17:20")
  Program.create(period_id: period9.id, title:"폐회")

puts "== CreateOrganizers: seeding ======================"
Organizer.create(event_id: event_camp4.id, position: 1, name:"김요한", role:"총괄", link: "http://www.facebook.com/hiphapis")
Organizer.create(event_id: event_camp4.id, position: 2, name:"조임현", role:"진행", link: "http://www.facebook.com/yimhyun.cho")
Organizer.create(event_id: event_camp4.id, position: 3, name:"한지혜", role:"진행", link: "http://www.facebook.com/jihyea.han.7")
Organizer.create(event_id: event_camp4.id, position: 4, name:"최봉준", role:"진행", link: "http://www.facebook.com/jjun0824")
Organizer.create(event_id: event_camp4.id, position: 5, name:"함지혜", role:"진행", link: "http://www.facebook.com/profile.php?id=100000642186516")
Organizer.create(event_id: event_camp4.id, position: 6, name:"이윤경", role:"진행", link: "http://www.facebook.com/yoonkyeong.lee.5")
Organizer.create(event_id: event_camp4.id, position: 7, name:"백재인", role:"진행", link: "http://www.facebook.com/james.baeck")
Organizer.create(event_id: event_camp4.id, position: 8, name:"임정민", role:"진행", link: "http://www.facebook.com/ja2me")
Organizer.create(event_id: event_camp4.id, position: 9, name:"권만진", role:"회계", link: "http://www.facebook.com/radiostar1122")
Organizer.create(event_id: event_camp4.id, position: 10, name:"심민수", role:"회계", link: "http://www.facebook.com/mins.stroy")
Organizer.create(event_id: event_camp4.id, position: 11, name:"정태진", role:"홍보", link: "http://www.facebook.com/itaijin")
Organizer.create(event_id: event_camp4.id, position: 12, name:"노수진", role:"홍보", link: "http://www.facebook.com/sujin.roh")
Organizer.create(event_id: event_camp4.id, position: 13, name:"김병환", role:"홍보", link: "http://www.facebook.com/kaidomo")
Organizer.create(event_id: event_camp4.id, position: 14, name:"배성환", role:"홍보", link: "http://www.facebook.com/cake.strategy")
Organizer.create(event_id: event_camp4.id, position: 15, name:"양지영", role:"홍보", link: "http://www.facebook.com/yang.jiyoung.3")
Organizer.create(event_id: event_camp4.id, position: 16, name:"강은정", role:"디자인")
Organizer.create(event_id: event_camp4.id, position: 17, name:"이준혁", role:"디자인", link: "http://www.facebook.com/miriya.lee")
Organizer.create(event_id: event_camp4.id, position: 18, name:"안지혜", role:"디자인", link: "http://www.facebook.com/jihye.an.547")
Organizer.create(event_id: event_camp4.id, position: 19, name:"최성현", role:"디자인", link: "http://www.facebook.com/ssungH")
Organizer.create(event_id: event_camp4.id, position: 20, name:"배영하", role:"디자인", link: "http://www.facebook.com/youngha.bae.5")
Organizer.create(event_id: event_camp4.id, position: 21, name:"강신녀", role:"디자인", link: "http://www.facebook.com/Leopulse")

puts "== CreateOrganizers: photo uploading ======================"
source_path = "#{::Rails.root.to_s}/public/seed/organizer_photos/camp4"
candidates = Dir.glob("#{source_path}/*.*")
candidates.each do |fullpath|
	begin
		puts "--- Trying file: #{fullpath}"
		extname = File.extname(fullpath)
		basename = File.basename(fullpath)
		filename = basename.gsub(extname, '')
    organizer = Organizer.find(filename)
    organizer.update_attributes(:photo => File.open(fullpath))
    organizer.save      
    puts "> #{organizer.photo.current_path}"
	rescue Exception => e
		puts e.message
		next
	end
end

puts "=====================DONE====================="
