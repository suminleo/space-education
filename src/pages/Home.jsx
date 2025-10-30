import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRandomizedExperts } from '../data/experts';

const Home = () => {
  const experts = getRandomizedExperts();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/20"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-normal text-white mb-8 leading-tight tracking-tight">
            우리는 도시를<br />
            설계하지 않는다
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 leading-relaxed">
            우리는 도시를 운영하고, 실험하고, 함께 배운다
          </p>
          <Link to="/curriculum" className="btn-simple bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900">
            프로그램 보기
          </Link>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-normal mb-8 leading-tight">
              소프트 디벨로퍼 클럽
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
              공간은 단순히 설계되는 것이 아니라, 운영되고 진화합니다.
            </p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              우리는 도시와 공간을 실험의 대상으로 보고,
              끊임없이 배우며 함께 성장하는 커뮤니티입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">멤버</h2>
            <p className="text-lg text-gray-600">
              각자의 분야에서 공간을 실험하는 사람들
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/experts/${expert.id}`} className="block group">
                  <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
                    {expert.image && expert.image !== '/images/experts/yoon-jooseon.jpg' ? (
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
                          <span className="text-3xl font-normal text-white">
                            {expert.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-normal mb-1">{expert.name}</h3>
                      <p className="text-sm text-white/80 mb-2">{expert.company}</p>
                      <p className="text-xs text-white/60">{expert.specialty}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/experts" className="btn-simple">
              모든 멤버 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">프로그램</h2>
            <p className="text-lg text-gray-600">
              각자의 필요에 맞는 학습 과정
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {[
              {
                id: 'students',
                title: '학생 과정',
                description: '공간 기획의 기초부터 실전까지'
              },
              {
                id: 'entrepreneurs',
                title: '창업가 과정',
                description: '공간 비즈니스의 모든 것'
              },
              {
                id: 'b2b',
                title: 'B2B 교육',
                description: '기업을 위한 맞춤형 프로그램'
              },
              {
                id: 'consulting',
                title: '1:1 컨설팅',
                description: '전문가와의 개인 세션'
              }
            ].map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-12 hover:bg-gray-50 transition-colors duration-300"
              >
                <Link to={`/curriculum#${program.id}`}>
                  <h3 className="text-2xl font-normal mb-3">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-normal mb-8 leading-tight">
              함께 배우고<br />
              함께 실험하세요
            </h2>
            <p className="text-lg text-white/80 mb-12">
              소프트 디벨로퍼 클럽과 함께하는 공간 교육
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/schedule" className="btn-simple border-white text-white hover:bg-white hover:text-gray-900">
                신청하기
              </Link>
              <Link to="/contact" className="btn-dark bg-white text-gray-900 hover:bg-gray-100">
                문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
