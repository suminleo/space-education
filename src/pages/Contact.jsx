import { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/supabase';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await db.createContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (error) throw error;

      alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-4xl md:text-6xl font-normal mb-6">문의</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              궁금한 점이 있으시다면 언제든지 연락주세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">이름</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">이메일</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-gray-700">문의 내용</label>
                  <textarea
                    name="message"
                    required
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-dark w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '전송 중...' : '보내기'}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-4">이메일</h3>
                  <p className="text-gray-600">contact@softdeveloper.club</p>
                  <p className="text-gray-600">info@softdeveloper.club</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">전화</h3>
                  <p className="text-gray-600">02-1234-5678</p>
                  <p className="text-sm text-gray-500 mt-2">평일 10:00 - 18:00</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">주소</h3>
                  <p className="text-gray-600">
                    서울특별시 강남구<br />
                    테헤란로 123<br />
                    소프트 디벨로퍼 클럽 빌딩 5층
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-medium mb-4">소셜</h3>
                  <div className="flex gap-6 text-sm">
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-gray-100 h-96">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-400">지도 영역</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
