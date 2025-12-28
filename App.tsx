import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  GraduationCap,
  FileText,
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight,
  Send,
  User,
  MessageSquare
} from 'lucide-react';

const EMAIL = 'naz.otken@gmail.com'; 
const LINKEDIN_URL = 'https://uk.linkedin.com/in/celennazotken'; // Placeholder
const GITHUB_URL = 'https://github.com/celennazotken'; // Placeholder
const GS_URL = 'https://scholar.google.com/citations?user=wF8vsPgAAAAJ&hl=tr'; // Placeholder
const CV_URL = './CNO_CV_Dec2025.pdf'; // Placeholder for CV
const FORMSPREE_URL = 'https://formspree.io/f/mqeklnnp';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0a0a0a] relative overflow-y-auto overflow-x-hidden py-12">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-yellow-200/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[30%] w-[50%] h-[50%] bg-white/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10 space-y-6"
      >
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
          {/* Decorative light effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
          
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Profile Photo */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-orange-600 via-orange-400 to-yellow-300 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1a1a] border-4 border-[#0a0a0a]">
                  <img
                    src="./img_nanobanana.jpg"
                    alt="Naz Otken"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Naz Otken
              </h1>
              <p className="text-orange-400 font-medium tracking-wide uppercase text-xs">
                Associate Product Manager @ Google
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p 
              variants={itemVariants}
              className="text-gray-400 text-sm leading-relaxed max-w-[280px]"
            >
              I keep things moving (the right way)
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="w-full space-y-3 pt-4">
              <SocialButton 
                href={LINKEDIN_URL} 
                icon={<Linkedin className="w-5 h-5" />} 
                label="LinkedIn"
                color="hover:bg-blue-900/40 hover:border-blue-700/60"
              />
              <SocialButton 
                href={GITHUB_URL} 
                icon={<Github className="w-5 h-5" />} 
                label="GitHub"
                color="hover:bg-zinc-900/60 hover:border-zinc-700/60"
              />
              <SocialButton 
                href={GS_URL} 
                icon={<GraduationCap className="w-5 h-5" />} 
                label="Google Scholar"
                color="hover:bg-green-900/40 hover:border-green-700/60"
              />
              <SocialButton 
                href={CV_URL} 
                download="Naz_Otken_CV.pdf"
                icon={<FileText className="w-5 h-5" />} 
                label="Download CV"
                color="hover:bg-purple-900/40 hover:border-purple-700/60"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={copyToClipboard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="text-sm font-medium ml-2">{EMAIL}</span>
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </div>
            </motion.button>
          </div>
        </div>

        {/* Contact Form Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">Contact Me</h2>
              <p className="text-gray-400 text-xs uppercase tracking-widest">Get in touch for collaborations</p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-8 space-y-4 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg">Thank you!</h3>
                    <p className="text-gray-400 text-sm">Your message has been sent successfully.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Your Message"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl text-white font-bold text-sm shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                  
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-center text-xs">Something went wrong. Please try again.</p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.p 
          variants={itemVariants}
          className="text-center mt-8 text-gray-600 text-[10px] uppercase tracking-[0.2em]"
        >
          © 2025 Naz Otken • Digital Business Card
        </motion.p>
      </motion.div>
    </div>
  );
}

function SocialButton({ href, icon, label, color, download }: { href: string, icon: React.ReactNode, label: string, color: string, download?: string }) {
  return (
    <motion.a
      href={href}
      download={download}
      target={download ? undefined : "_blank"}
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 group ${color}`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </motion.a>
  );
}
