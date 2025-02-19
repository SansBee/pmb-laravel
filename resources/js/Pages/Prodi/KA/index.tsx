import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';

export default function KomputerisasiAkuntansi() {
    const prodiData = {
        name: 'Komputerisasi Akuntansi',
        description: 'Program studi yang mengintegrasikan ilmu akuntansi dengan teknologi informasi untuk menghasilkan profesional yang ahli dalam sistem informasi akuntansi dan keuangan digital',
        image: '/images/prodi/ka-hero.jpg',
        stats: [
            { label: 'Akreditasi', value: 'A', icon: '🏆' },
            { label: 'Mahasiswa Aktif', value: '300+', icon: '👨‍🎓' },
            { label: 'Dosen', value: '15+', icon: '👨‍🏫' },
            { label: 'Partner Industri', value: '35+', icon: '🤝' }
        ],
        highlights: [
            {
                title: 'Program Unggulan',
                items: [
                    'Sistem Informasi Akuntansi',
                    'Financial Technology',
                    'Digital Accounting',
                    'Tax Management System',
                    'Enterprise Resource Planning'
                ]
            },
            {
                title: 'Sertifikasi',
                items: [
                    'Certified Public Accountant (CPA)',
                    'SAP Financial Consultant',
                    'Certified Information Systems Auditor',
                    'Chartered Accountant',
                    'Tax Professional License'
                ]
            }
        ],
        facilities: [
            {
                name: 'Accounting Lab',
                description: 'Lab dengan software akuntansi profesional (SAP, MYOB, Accurate)',
                icon: '📊'
            },
            {
                name: 'Tax Center',
                description: 'Pusat pembelajaran perpajakan dan konsultasi pajak',
                icon: '📋'
            },
            {
                name: 'FinTech Lab',
                description: 'Laboratorium financial technology dan digital banking',
                icon: '💰'
            },
            {
                name: 'Audit Simulation Room',
                description: 'Ruang simulasi audit dan praktik akuntansi',
                icon: '📈'
            }
        ],
        testimonials: [
            {
                name: 'Maya Sari',
                role: 'Financial System Analyst at Bank BNI',
                image: '/images/testimonials/7.jpg',
                quote: 'Program KA memberikan pemahaman yang mendalam tentang integrasi teknologi dalam sistem keuangan modern.'
            },
            {
                name: 'Budi Santoso',
                role: 'Tax Consultant at Deloitte',
                image: '/images/testimonials/8.jpg',
                quote: 'Kurikulum yang komprehensif mempersiapkan saya menghadapi era digitalisasi perpajakan.'
            }
        ],
        researchGroups: [
            {
                name: 'Digital Accounting Research Group',
                projects: ['Blockchain Accounting', 'AI in Financial Analysis', 'Digital Tax System'],
                publications: 14
            },
            {
                name: 'FinTech Innovation Group',
                projects: ['Digital Payment Systems', 'Cryptocurrency', 'Smart Contracts'],
                publications: 12
            },
            {
                name: 'Accounting Information Systems Group',
                projects: ['ERP Implementation', 'Audit Technology', 'Financial Analytics'],
                publications: 16
            }
        ],
        careerProspects: [
            {
                role: 'Financial System Analyst',
                companies: ['Bank BCA', 'Bank Mandiri', 'Bank BNI'],
                salary: 'Rp 8-15 juta/bulan'
            },
            {
                role: 'Digital Tax Consultant',
                companies: ['Deloitte', 'PwC', 'KPMG'],
                salary: 'Rp 10-20 juta/bulan'
            },
            {
                role: 'FinTech Specialist',
                companies: ['OVO', 'GoPay', 'DANA'],
                salary: 'Rp 12-18 juta/bulan'
            }
        ]
    };

    // Gunakan struktur JSX yang sama seperti halaman prodi lainnya
    // Untuk menghemat ruang, saya tidak menulis ulang bagian JSX karena strukturnya sama
    // Anda bisa menggunakan struktur yang sama dengan konten dari prodiData di atas

    return (
        <LandingLayout>
            <Head title="Komputerisasi Akuntansi - Universitas Langit Timur" />
            
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-screen"
            >
                <div className="absolute inset-0">
                    <img
                        src={prodiData.image}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                </div>
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            Program Studi<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Komputerisasi Akuntansi
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                        >
                            {prodiData.description}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <a
                                href="#learn-more"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Pelajari Lebih Lanjut
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {prodiData.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Program Unggulan Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {prodiData.highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {highlight.title}
                                </h3>
                                <ul className="space-y-4">
                                    {highlight.items.map((item, itemIndex) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: itemIndex * 0.1 }}
                                            className="flex items-center text-gray-600 dark:text-gray-300"
                                        >
                                            <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fasilitas Section */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Fasilitas Modern
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {prodiData.facilities.map((facility, index) => (
                            <motion.div
                                key={facility.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                            >
                                <div className="text-4xl mb-4">{facility.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {facility.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {facility.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Research Groups Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Grup Riset
                    </motion.h2>
                    <div className="space-y-12">
                        {prodiData.researchGroups.map((group, index) => (
                            <motion.div
                                key={group.name}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                            {group.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {group.projects.map((project) => (
                                                <span
                                                    key={project}
                                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                                                >
                                                    {project}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                            {group.publications}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Publikasi
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Career Prospects Section */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Prospek Karir
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {prodiData.careerProspects.map((career, index) => (
                            <motion.div
                                key={career.role}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                            >
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                    {career.role}
                                </h3>
                                <div className="mb-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        Perusahaan:
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {career.companies.map((company) => (
                                            <span
                                                key={company}
                                                className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                                            >
                                                {company}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-gray-900 dark:text-white font-medium">
                                    {career.salary}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Testimoni Alumni
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {prodiData.testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-indigo-600 dark:text-indigo-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.quote}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white mb-8"
                    >
                        Siap Bergabung dengan Komputerisasi Akuntansi?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <a
                            href="/pmb"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300"
                        >
                            Daftar Sekarang
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
} 