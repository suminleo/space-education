import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Curriculum = () => {
  const programs = [
    {
      id: 'students',
      title: '학생 과정',
      description: '공간 기획의 기초부터 실전 프로젝트까지, 학생들을 위한 체계적인 과정',
      duration: '8주',
      sessions: '16회',
      features: [
        '공간 기획의 기본 개념과 원리',
        '트렌드 분석 및 리서치 방법론',
        '콘셉트 개발 및 스토리텔링',
        '공간 브랜딩 전략',
        '실전 프로젝트 기획 및 발표'
      ]
    },
    {
      id: 'entrepreneurs',
      title: '창업가 과정',
      description: '성공적인 공간 비즈니스를 위한 실전 창업 노하우',
      duration: '12주',
      sessions: '24회',
      features: [
        '공간 비즈니스 모델 설계',
        '입지 분석 및 시장 조사',
        '자금 조달 및 재무 계획',
        '공간 운영 및 관리 전략',
        '마케팅 및 홍보 전략'
      ]
    },
    {
      id: 'b2b',
      title: 'B2B 교육',
      description: '기업 맞춤형 공간 기획 교육 및 워크샵 프로그램',
      duration: '맞춤형',
      sessions: '협의',
      features: [
        '기업 브랜드 공간 전략',
        '오피스 공간 기획',
        '리테일 공간 혁신',
        '팝업스토어 기획 및 운영',
        '팀 빌딩 워크샵'
      ]
    },
    {
      id: 'consulting',
      title: '1:1 컨설팅',
      description: '전문가 1:1 컨설팅을 통한 맞춤형 공간 기획 솔루션',
      duration: '1~3개월',
      sessions: '협의',
      features: [
        '프로젝트 진단 및 분석',
        '맞춤형 전략 수립',
        '실행 계획 개발',
        '정기 미팅 및 피드백',
        '사후 지원'
      ]
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-white border-b border-gray-200">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-normal mb-6">프로그램</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              각자의 목표에 맞는 학습 과정
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="space-y-24">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                id={program.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                  {/* Left: Title & Info */}
                  <div className="lg:col-span-4">
                    <h2 className="text-3xl md:text-4xl font-normal mb-6">{program.title}</h2>
                    <p className="text-base text-gray-600 leading-relaxed mb-8">
                      {program.description}
                    </p>
                    <div className="space-y-3 text-sm mb-8">
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-500">기간</span>
                        <span className="font-medium">{program.duration}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-500">세션</span>
                        <span className="font-medium">{program.sessions}</span>
                      </div>
                    </div>
                    <Link to="/schedule" className="btn-simple inline-block">
                      신청하기
                    </Link>
                  </div>

                  {/* Right: Features */}
                  <div className="lg:col-span-8">
                    <h3 className="text-lg font-medium mb-6">커리큘럼</h3>
                    <ul className="space-y-4">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start border-b border-gray-100 pb-4">
                          <span className="text-gray-400 mr-4 text-sm">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-normal mb-6">
              궁금한 점이 있으신가요?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              프로그램에 대해 더 자세히 알고 싶으시다면 언제든 문의해주세요
            </p>
            <Link to="/contact" className="btn-simple">
              문의하기
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Curriculum;
