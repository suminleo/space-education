import { useState } from 'react';
import { motion } from 'framer-motion';

const Schedule = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const courses = [
    {
      id: 'students-basic',
      title: '학생 기초반',
      startDate: '2025년 3월 10일',
      duration: '8주',
      schedule: '매주 화, 목 19:00-21:00',
      price: '1,200,000원',
      available: 7
    },
    {
      id: 'entrepreneurs-basic',
      title: '창업가 기본반',
      startDate: '2025년 3월 5일',
      duration: '12주',
      schedule: '매주 수 19:00-22:00',
      price: '2,400,000원',
      available: 3
    },
    {
      id: 'entrepreneurs-weekend',
      title: '창업가 주말반',
      startDate: '2025년 3월 12일',
      duration: '12주',
      schedule: '매주 토 10:00-16:00',
      price: '2,400,000원',
      available: 8
    },
    {
      id: 'b2b-custom',
      title: 'B2B 맞춤 교육',
      startDate: '협의',
      duration: '협의',
      schedule: '협의',
      price: '별도 문의',
      available: null
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourse || !paymentMethod) {
      alert('과정과 결제 방법을 선택해주세요.');
      return;
    }
    const course = courses.find(c => c.id === selectedCourse);
    alert(`신청이 접수되었습니다.\n과정: ${course.title}`);
  };

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
            <h1 className="text-4xl md:text-6xl font-normal mb-6">신청</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              원하시는 과정을 선택하고 바로 신청하세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses List */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="space-y-1">
            {courses.map((course, index) => (
              <motion.button
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCourse(course.id)}
                className={`w-full text-left p-8 transition-colors duration-300 ${
                  selectedCourse === course.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-normal mb-4">{course.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className={selectedCourse === course.id ? 'text-white/60' : 'text-gray-500'}>시작일</p>
                        <p className="mt-1">{course.startDate}</p>
                      </div>
                      <div>
                        <p className={selectedCourse === course.id ? 'text-white/60' : 'text-gray-500'}>기간</p>
                        <p className="mt-1">{course.duration}</p>
                      </div>
                      <div>
                        <p className={selectedCourse === course.id ? 'text-white/60' : 'text-gray-500'}>스케줄</p>
                        <p className="mt-1">{course.schedule}</p>
                      </div>
                      {course.available !== null && (
                        <div>
                          <p className={selectedCourse === course.id ? 'text-white/60' : 'text-gray-500'}>잔여석</p>
                          <p className="mt-1">{course.available}석</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-normal">{course.price}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {selectedCourse && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-padding bg-gray-50"
        >
          <div className="container-custom max-w-3xl">
            <h2 className="text-3xl font-normal mb-12 text-center">신청 정보</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">이름</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">이메일</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">연락처</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm mb-4 text-gray-700">결제 방법</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('toss')}
                    className={`p-6 border transition-colors ${
                      paymentMethod === 'toss'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <p className="font-normal">토스페이</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-6 border transition-colors ${
                      paymentMethod === 'paypal'
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <p className="font-normal">페이팔</p>
                  </button>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="btn-dark w-full py-4">
                  신청하기
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Schedule;
