import { SignInButton, SignUpButton, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { SiWheniwork } from 'react-icons/si'
import { FaCheckCircle, FaCalendarAlt, FaBell, FaChartLine } from 'react-icons/fa'
import { MdTaskAlt } from 'react-icons/md'

const LandingPage = () => {
    const { isSignedIn } = useUser();

    if (isSignedIn) {
        return null; // L'utilisateur est connecté, ne pas afficher la landing page
    }

    const features = [
        {
            icon: <FaCheckCircle className="text-4xl text-green-400" />,
            title: "Gestion Intuitive",
            description: "Créez et gérez vos tâches avec une interface simple et élégante"
        },
        {
            icon: <FaCalendarAlt className="text-4xl text-blue-400" />,
            title: "Deadlines Intelligentes", 
            description: "Ne ratez plus jamais une échéance avec notre système de rappels"
        },
        {
            icon: <FaBell className="text-4xl text-yellow-400" />,
            title: "Notifications",
            description: "Restez informé de vos tâches importantes en temps réel"
        },
        {
            icon: <FaChartLine className="text-4xl text-purple-400" />,
            title: "Statistiques Avancées",
            description: "Suivez votre productivité avec des métriques détaillées"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Navigation */}
            <motion.nav 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex justify-between items-center p-6 lg:px-12"
            >
                <div className="flex items-center gap-3">
                    <SiWheniwork className="w-10 h-10 text-purple-400 animate-pulse" />
                    <span className="text-2xl lg:text-3xl font-bold text-white">Task Flow Pro</span>
                </div>
                
                <div className="flex gap-3">
                    <SignInButton mode="modal">
                        <button className="btn btn-outline btn-primary px-6 py-2 rounded-full hover:scale-105 transition-transform">
                            Connexion
                        </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="btn btn-primary px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg shadow-purple-500/50">
                            Inscription
                        </button>
                    </SignUpButton>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="space-y-8"
                    >
                        <motion.h1 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-4xl lg:text-6xl font-bold text-white leading-tight"
                        >
                            Organisez votre vie avec
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> 
                                {" "}Task Flow Pro
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-xl text-gray-300 leading-relaxed"
                        >
                            L'application de gestion de tâches la plus intuitive et puissante. 
                            Gérez vos projets, suivez vos progrès et atteignez vos objectifs avec style.
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <SignUpButton mode="modal">
                                <button className="btn btn-primary btn-lg px-8 py-4 rounded-full text-sm hover:scale-105 transition-all shadow-2xl shadow-purple-500/50">
                                    <MdTaskAlt className="mr-2" />
                                    Commencer Gratuitement
                                </button>
                            </SignUpButton>
                            
                            <SignInButton mode="modal">
                                <button className="btn btn-outline btn-primary btn-lg px-8 py-4 rounded-full text-sm hover:scale-105 transition-all">
                                    Déjà membre ? Se connecter
                                </button>
                            </SignInButton>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="flex items-center gap-4 text-sm text-gray-400"
                        >
                            <FaCheckCircle className="text-green-400" />
                            <span>Gratuit pour toujours</span>
                            <FaCheckCircle className="text-green-400" />
                            <span>Pas de carte de crédit requise</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Animation */}
                    <motion.div
                        initial={{ x: 100, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="relative z-10">
                            {/* Floating Cards Animation */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-white font-medium">Tâche Terminée</span>
                                </div>
                                <p className="text-gray-300">Finaliser la présentation client</p>
                                <div className="mt-3 text-xs text-green-400">✓ Complétée aujourd'hui</div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className=" bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl mt-6 ml-8"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <span className="text-white font-medium">En Cours</span>
                                </div>
                                <p className="text-gray-300">Développer nouvelle fonctionnalité</p>
                                <div className="mt-3 text-xs text-yellow-400">📅 Échéance: 2 jours</div>
                            </motion.div>
                        </div>

                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl -z-10"></div>
                    </motion.div>
                </div>

                {/* Features Section */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 lg:mt-32"
                >
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl lg:text-4xl font-bold text-white mb-4"
                        >
                            Pourquoi choisir Task Flow Pro ?
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-300"
                        >
                            Découvrez les fonctionnalités qui font la différence
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group"
                            >
                                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-24 lg:mt-32 mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Prêt à transformer votre productivité ?
                    </h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers d'utilisateurs qui ont déjà révolutionné leur gestion de tâches avec Task Flow Pro.
                    </p>
                    <SignUpButton mode="modal">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary btn-lg px-12 py-4 rounded-full text-xl shadow-2xl shadow-purple-500/50"
                        >
                            Commencer Maintenant
                        </motion.button>
                    </SignUpButton>
                </motion.div>
            </div>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
                />
            </div>
        </div>
    );
};

export default LandingPage;