import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, Heart, Shield, Users, Home, ChevronDown, Car, Bus } from 'lucide-react';
import './App.css';

const HappyNursingHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [activeQna, setActiveQna] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  // 6무 원칙 데이터 (원본 그대로)
  const values = [
    {
      icon: Shield,
      title: '냄새 무',
      subtitle: '악취가 없게 노력한다',
      description: '깨끗한 환경의 유지를 위해 24시간마다 환기하는 시스템을 갖추어 항상 쾌적함을 유지하고 있습니다.'
    },
    {
      icon: Shield,
      title: '낙상사고 무',
      subtitle: '',
      description: '안전바를 설치하고 재활치료를 통해 균형감각과 근력을 증가하여 낙상 발생을 예방하고 있습니다.'
    },
    {
      icon: Shield,
      title: '욕창 무',
      subtitle: '욕창이 생기지 않게 노력한다',
      description: '욕창을 예방하기 위해서 2시간마다 체위변경을 돕고 아침마다 피부전체를 확인하여 스킨케어를 실시하고 있습니다.'
    },
    {
      icon: Shield,
      title: '와상 무',
      subtitle: '와상환자가 되지 않게 노력한다',
      description: '침대에서 벗어나 생활할 수 있도록 돕고 전문 재활치료와 더불어 몸을 움직일 수 있도록 일상 재활프로그램을 실시하고 있습니다.'
    },
    {
      icon: Shield,
      title: '탈 기저귀',
      subtitle: '가능한 한 기저귀 착용을 배제한다',
      description: '배설감각을 느낄 수 있는 환자분인지 확인 후 앉으실 수 있다면 화장실을 이용하도록 돕고, 기저귀 착용은 최후의 수단으로써 사용하되, 최대한 쾌적한 기저귀 사용이 될 수 있도록 도와드리고 있습니다.'
    },
    {
      icon: Shield,
      title: '탈 억제대',
      subtitle: '억제대 사용을 최소로 한다',
      description: '환자의 안전과 보호라는 명분으로 신체 억제대를 남용하여 사용하거나 약물을 투여하여 재우는 화학적 구속은 존엄성 회복에서 가장 우선적으로 짚고 넘어가야 할 문제입니다.'
    }
  ];

  // Q&A 데이터 (원본 그대로 - 6개)
  const qnaList = [
    {
      question: '요양원과 요양병원의 차이는 무엇일까요?',
      answer: `요양병원은 '의료법'과 '건강보험법'을 근간으로 운영되는 '의료시설'입니다.\n요양병원에는 상주하는 의사와 간호사가 있기 때문에 질병에 대한 진료를 입원하여 받을 수 있습니다. 추가로 건강보험이 적용되며, 정부에서 최대 80%를 지원해주고 있습니다.\n요양병원은 말 그대로 병원입니다. 주로 질병 치료와 간병, 회복 등을 위해 입원하는 곳으로 요양원보다 높은 비용이 발생할 수 있습니다.\n\n요양원은 '노인복지법'과 '노인장기요양보험법'에 근간을 두고 있으며, 일상생활에서 도움을 필요로 하는 어르신들이 계시는 생활시설입니다. 요양병원에 입소하신 분들보다 상대적으로 건강한 어르신들을 위한 시설입니다.\n만 65세 이상 어르신들 중에서 요양등급 판정을 받으신 분들만 우선적으로 입소 가능합니다. 장기요양보험이 적용되어 정부에서 최대 80% 지원 받을 수 있습니다.`
    },
    {
      question: '비급여 비용의 범위는 어떻게 되나요?',
      answer: `◦ ｢노인장기요양보험법 시행규칙｣ 제14조(장기요양급여의 범위 등)에서 장기요양 비급여의 범위를 정하고 있으며, "장기요양급여의 범위에서 제외되는 사항으로 식사재료비, 상급침실 이용에 따른 추가비용, 이･미용비, 그 외 일상생활에 통상 필요한 것과 관련된 비용으로 수급자에게 부담시키는 것이 적당하다고 보건복지부장관이 정하여 고시하는 비용"을 말합니다.\n\n- 비급여 항목의 비용은 원칙적으로 해당 용역을 제공하기 위한 실제 소요비용(실비)를 산정하여야 하며, 사실상 다른 명목의 비용을 비급여 항목 내에 포함시켜서는 안 됩니다.\n\n- 실제비용(실비)이라 함은 물품 또는 기타 용역을 제공함에 있어 실제 소요되는 비용으로 별도의 이윤을 부가하지 않는 비용을 말합니다.\n\n- 식사재료비는 비급여대상이며, 그 중 경관영양 유동식을 시설에서 자체적으로 조제하거나 완제품을 사용하는 경우 소요되는 비용은 식사재료비의 일종으로 수급자가 부담하여야 합니다.`
    },
    {
      question: '요양원 입소 준비물은 어떻게 되나요?',
      answer: `서류\n1. 장기요양인정서\n2. 개인별장기요양이용계획서\n3. 주민등록등본\n4. 건강진단서\n5. 신분증 사본\n\n기타\n- 의사소견서(필요에 따라)\n- 처방전(필요에 따라)\n- 어르신 회상물품(사진/앨범 등)`
    },
    {
      question: '장기요양인정 신청은 어디에, 어떤 방법으로 하나요?',
      answer: `◦ 장기요양인정 신청은 지사 방문, 우편, 팩스, 인터넷(노인장기요양보험 홈페이지, 모바일앱(The건강보험)), 유선(갱신신청에 한함)으로 가능하며, 또한 신청인이 신체적･정신적 사유로 신청행위를 직접 할 수 없을 때 가족, 친족, 그 밖의 이해 관계인 등이 대리하여 신청할 수 있습니다.`
    },
    {
      question: '장기요양인정조사 방문시 어떤 내용을 조사하나요?',
      answer: `◦ 국민건강보험공단 직원은 신청인을 방문하여 ｢장기요양인정조사표｣(시행규칙 별지 제5호서식)에 의해 신청인의 심신상태 등에 대하여 각 영역별 판단기준에 의해 조사합니다.\n\n◦ ｢장기요양인정조사표｣의 항목은 총 90개인데, 그 중 장기요양인정과 관련된 항목은 52개 항목이며 개인별장기요양이용계획과 관련된 항목은 장기요양인정조사 전체 항목입니다.`
    },
    {
      question: '수급자가 시설에 입소 중 병원에 입원하였을 경우, 시설에 지불하는 본인 부담금과 식사재료비는 어떻게 되나요?',
      answer: `입소기간 중 의료기관에 입원하여 외박을 한 경우에는 해당 등급별 1일당 수가의 50%를 산정하는 바, 외박기간 동안 발생한 비용에 대하여도 비용의 일부를 부담해야 합니다. 따라서 본인부담금은 외박수가(해당 등급별 1일당 수가의 50%)의 20%가 되며, 비급여 대상인 식사재료비는 실제로 시설에서 식사하지 않았다면 부담하지 않아도 됩니다.\n\n※ 외박비용은 수급자가 의료기관에 입원하거나 시설장의 허가를 받아 외박을 한 경우에 산정하며 1회당 최대 10일(1개월에 15일)까지 산정할 수 있습니다.`
    }
  ];

  return (
    <div>
      {/* Navigation */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo" onClick={() => scrollToSection('home')}>
              <span className="serif" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                행복한요양원 녹양역점
              </span>
            </div>

            <div className="nav-menu">
              {[
                { id: 'home', label: '홈' },
                { id: 'about', label: '소개' },
                { id: 'values', label: '존엄케어' },
                { id: 'facilities', label: '시설안내' },
                { id: 'qna', label: 'Q&A' },
                { id: 'location', label: '오시는길' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  {item.label}
                </button>
              ))}
              <button onClick={() => scrollToSection('contact')} className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                상담신청
              </button>
            </div>

            <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="nav-mobile-menu">
            {[
              { id: 'home', label: '홈' },
              { id: 'about', label: '소개' },
              { id: 'values', label: '존엄케어' },
              { id: 'facilities', label: '시설안내' },
              { id: 'qna', label: 'Q&A' },
              { id: 'location', label: '오시는길' },
              { id: 'contact', label: '상담신청' },
            ].map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="section-container">
          <h1 className="serif hero-title animate-fade-in stagger-1">
            행복한요양원 녹양역점
          </h1>
          <p className="hero-subtitle animate-fade-in stagger-2">
            어르신의 품위있는 돌봄을 위한 존엄케어 실천
          </p>
          <div className="hero-buttons animate-fade-in stagger-3">
            <button onClick={() => scrollToSection('contact')} className="btn-primary">
              상담 신청하기
            </button>
            <button onClick={() => scrollToSection('about')} className="btn-secondary">
              시설 둘러보기
            </button>
          </div>

          <div className="card-grid" style={{ marginTop: '3rem' }}>
            {[
              { icon: Phone, title: '24시간 상담', desc: '031-856-8090' },
              { icon: MapPin, title: '편리한 위치', desc: '양주역 도보 867m' },
              { icon: Clock, title: '상담 시간', desc: '평일 09:00-18:00' },
            ].map((item, idx) => (
              <div key={idx} className="card animate-fade-in" style={{ animationDelay: `${0.4 + idx * 0.1}s`, opacity: 0 }}>
                <div className="card-icon">
                  <item.icon size={32} style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="serif section-title">행복한요양원을 소개합니다</h2>
          <p className="section-subtitle">
            어르신 한 분 한 분의 건강과 행복을 최우선으로 생각하는 요양원입니다
          </p>

          <div className="card-grid">
            {[
              { 
                icon: Heart, 
                title: '사랑과 정성', 
                desc: '가족처럼 따뜻하게 모시겠습니다. 어르신 한 분 한 분의 상태를 세심하게 살피며 최선의 케어를 제공합니다.' 
              },
              { 
                icon: Users, 
                title: '전문 의료진', 
                desc: '간호사, 물리치료사, 영양사 등 전문 인력이 협력하여 어르신의 건강을 책임집니다.' 
              },
              { 
                icon: Home, 
                title: '편안한 환경', 
                desc: '넓고 쾌적한 공간과 최신 시설로 집처럼 편안한 생활을 제공합니다.' 
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <div style={{ 
                    width: '3.5rem', height: '3.5rem', borderRadius: '0.75rem',
                    background: 'var(--primary)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0
                  }}>
                    <item.icon size={28} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-medium)' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - 6무 원칙 */}
      <section id="values" style={{ background: 'var(--warm-bg)' }}>
        <div className="section-container">
          <h2 className="serif section-title">존엄케어 가치</h2>
          <p className="section-subtitle">
            어르신의 품위있는 돌봄을 위한 행복한요양원 녹양역점의 6무 원칙
          </p>

          <div className="values-grid">
            {values.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">
                  <value.icon size={36} style={{ color: 'white' }} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                {value.subtitle && <p className="value-subtitle">{value.subtitle}</p>}
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="serif section-title">시설 둘러보기</h2>
          <p className="section-subtitle">
            어르신이 편안하게 생활하실 수 있는 최적의 환경
          </p>

          <div className="card-grid">
            {[
              { name: '1인실', desc: '개인 공간 보장' },
              { name: '2인실', desc: '동반자와 함께' },
              { name: '물리치료실', desc: '재활 전문 공간' },
              { name: '식당', desc: '단체 식사 공간' },
              { name: '휴게실', desc: '휴식 및 담소' },
              { name: '프로그램실', desc: '다양한 활동' },
              { name: '목욕실', desc: '안전한 시설' },
              { name: '정원', desc: '산책 및 휴식' },
            ].map((facility, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '5rem', height: '5rem', borderRadius: '50%', background: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
                }}>
                  <Home size={36} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{facility.name}</h3>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-medium)' }}>{facility.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <section id="qna" style={{ background: 'var(--warm-bg)' }}>
        <div className="section-container">
          <h2 className="serif section-title">자주 묻는 질문</h2>
          <p className="section-subtitle">
            궁금하신 사항을 확인해보세요
          </p>

          <div className="qna-container">
            {qnaList.map((qna, idx) => (
              <div key={idx} className="qna-item">
                <div 
                  className={`qna-question ${activeQna === idx ? 'active' : ''}`}
                  onClick={() => setActiveQna(activeQna === idx ? null : idx)}
                >
                  <span className="qna-q-text">
                    <strong>Q.</strong> {qna.question}
                  </span>
                  <ChevronDown size={24} className="qna-icon" />
                </div>
                <div className={`qna-answer ${activeQna === idx ? 'active' : ''}`}>
                  <p style={{ whiteSpace: 'pre-line' }}>{qna.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" style={{ background: 'white' }}>
        <div className="section-container">
          <h2 className="serif section-title">오시는 길</h2>
          <p className="section-subtitle">
            양주역에서 가까운 편리한 위치
          </p>

          <div className="map-info">
            <div className="info-card">
              <h3 className="info-title">
                <MapPin style={{ color: 'var(--primary)' }} />
                찾아오시는 방법
              </h3>
              <div className="info-content">
                <div className="info-section">
                  <p className="info-section-title">주소</p>
                  <p>경기 양주시 외미로20번길 34 (남방동)</p>
                </div>
                <div className="info-section">
                  <p className="info-section-title">
                    <Bus size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    버스
                  </p>
                  <p>의정부역, 농협앞 승차<br />7, 31, 35, 25-1, 39번<br />비석거리 하차 도보 7분</p>
                </div>
                <div className="info-section">
                  <p className="info-section-title">지하철</p>
                  <p>1호선 양주역 2번 출구<br />도보 867m</p>
                </div>
                <div className="info-section">
                  <p className="info-section-title">
                    <Car size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                    자가용
                  </p>
                  <p>통일로 IC → 의정부, 송추 방면<br />호원IC → 양주, 의정부시청 방면<br />녹양사거리에서 좌회전</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3 className="info-title">
                <Phone style={{ color: 'var(--primary)' }} />
                연락처 정보
              </h3>
              <div className="info-content">
                <div className="info-section">
                  <p className="info-section-title">전화 상담</p>
                  <a href="tel:031-856-8090" style={{ textDecoration: 'none' }}>
                    <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)', margin: '0.5rem 0' }}>
                      031-856-8090
                    </p>
                  </a>
                  <p>평일 09:00 - 18:00<br />토요일 09:00 - 13:00</p>
                </div>
                <div className="info-section">
                  <p className="info-section-title">방문 상담</p>
                  <p>사전 예약 후 방문 부탁드립니다<br />시설 견학 가능</p>
                </div>
                <div className="info-section" style={{ background: 'var(--warm-bg)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>24시간 응급 연락</p>
                  <p>입소 가족분들은 언제든지<br />비상 연락이 가능합니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ background: 'var(--warm-bg)' }}>
        <div className="section-container">
          <h2 className="serif section-title">상담 신청</h2>
          <p className="section-subtitle">
            입소 상담 및 시설 견학을 원하시면 연락 주세요
          </p>

          <div className="form-container">
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              alert('상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'); 
            }}>
              <div className="form-group">
                <label className="form-label">보호자 이름 *</label>
                <input type="text" required className="form-input" placeholder="이름을 입력하세요" />
              </div>
              <div className="form-group">
                <label className="form-label">보호자 연락처 *</label>
                <input type="tel" required className="form-input" placeholder="010-0000-0000" pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}" />
              </div>
              <div className="form-group">
                <label className="form-label">문의 유형</label>
                <select className="form-select">
                  <option>입소 상담</option>
                  <option>시설 견학</option>
                  <option>비용 문의</option>
                  <option>프로그램 문의</option>
                  <option>기타 문의</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">기타 요청사항</label>
                <textarea className="form-textarea" placeholder="기타 요청사항이 있으신 경우 여기에 기입해주시기 바랍니다."></textarea>
              </div>
              <div className="form-group">
                <div className="form-checkbox-container">
                  <label className="form-checkbox-label">
                    <input type="checkbox" required className="form-checkbox" />
                    <span>개인정보 수집 및 이용에 동의합니다. (수집된 정보는 상담 목적으로만 사용되며, 상담 종료 후 안전하게 폐기됩니다)</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                신청완료
              </button>
            </form>

            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #ddd', textAlign: 'center' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-medium)', marginBottom: '1rem' }}>
                또는 전화로 직접 문의하세요
              </p>
              <a href="tel:031-856-8090" style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '1rem', display: 'inline-block' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    031-856-8090
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">
                <span className="serif" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  행복한요양원 녹양역점
                </span>
              </div>
              <div className="footer-info">
                <p>어르신의 건강하고 행복한 노후를 함께합니다</p>
              </div>
            </div>

            <div>
              <h4 className="footer-title">시설 정보</h4>
              <div className="footer-info">
                <p>주소: 경기 양주시 외미로20번길 34 (남방동)</p>
                <p>전화: 031-856-8090</p>
                <p>사업자등록번호: 128-87-15345</p>
                <p>대표자: 이찬재</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 행복한요양원 녹양역점. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HappyNursingHome;
