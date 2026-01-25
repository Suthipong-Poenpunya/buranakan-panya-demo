import React, { useState, useEffect, useRef } from 'react';
import {
    BookOpen, FileText, Brain, Link as LinkIcon, Upload, CheckCircle,
    AlertTriangle, ChevronRight, Menu, X, BarChart3, Search, User,
    ShieldCheck, Award, RefreshCw, Send, Edit2, Save, Printer,
    Share2, Hash, Clock, Database, Trash2, Plus
} from 'lucide-react';

// ==================================================================
// 🔧 ส่วนตั้งค่า (Configuration) - วางลิงก์ที่คุณได้จาก Deploy ตรงนี้
// ==================================================================

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFE7SmDDcDKxwUKPn4URxUgcZXkQRYO-fqfpeHQ5hLAI5uGx2PFcL0xFr2KBPnQ4tD/exec"; 

// ==================================================================


// --- Shared Utility Components ---

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// --- Main Layout ---

const Layout = ({ children, activeModule, setActiveModule, notifications }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'หน้าหลัก', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 'kru-leka', label: 'ครูเลขา (Admin AI)', icon: <FileText className="w-5 h-5" /> },
        { id: 'kru-mate', label: 'ครูเมท (Lesson AI)', icon: <Brain className="w-5 h-5" /> },
        { id: 'panya-chain', label: 'ปัญญาเชน (Credit Bank)', icon: <LinkIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveModule('home')}>
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg mr-3 shadow-md">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 leading-none tracking-tight">บูรณาการปัญญา</h1>
                                <p className="text-xs text-indigo-600 font-medium mt-0.5">Education OS 2026 Beta</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveModule(item.id)}
                                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        activeModule === item.id
                                            ? 'text-indigo-600 bg-indigo-50 shadow-sm ring-1 ring-indigo-100'
                                            : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-200 animate-in slide-in-from-top-2">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveModule(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center px-3 py-4 rounded-md text-base font-medium ${
                                        activeModule === item.id
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
                {children}
            </main>
        </div>
    );
};

// --- Module 1: Home Dashboard ---

const HomeModule = ({ setModule, recentActivities }) => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-600 rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10 blur-xl"></div>

                <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center space-x-2 mb-4 bg-indigo-800/30 w-fit px-3 py-1 rounded-full text-xs font-medium border border-indigo-400/30">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span>System Operational</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">ยินดีต้อนรับ, คุณครูสมศรี</h2>
                    <p className="text-indigo-100 text-lg mb-8 leading-relaxed max-w-2xl">
                        ระบบ "บูรณาการปัญญา" พร้อมช่วยงานคุณแล้ว วันนี้มีเอกสารรอตรวจสอบ 2 รายการ และมีนักเรียนขอเทียบโอนหน่วยกิต 1 ราย
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setModule('kru-leka')}
                            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all active:scale-95 flex items-center ring-4 ring-white/20"
                        >
                            เริ่มสแกนเอกสาร (OCR) <ChevronRight className="ml-2 w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setModule('kru-mate')}
                            className="bg-indigo-800/40 text-white border border-indigo-300/50 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-800/60 transition-all backdrop-blur-sm"
                        >
                            สร้างแผนการสอนใหม่
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { id: 'kru-leka', title: 'ครูเลขา', sub: 'Admin Automation', desc: 'ลดภาระงานเอกสาร ปพ.5 ด้วย AI OCR และตรวจสอบข้อมูลอัตโนมัติ', icon: <FileText className="w-6 h-6 text-blue-600" />, color: 'bg-blue-50 border-blue-100', hover: 'hover:border-blue-300' },
                        { id: 'kru-mate', title: 'ครูเมท', sub: 'Smart Lesson Plan', desc: 'ออกแบบการสอนแบบ Active Learning ที่เข้าใจบริบทท้องถิ่น', icon: <Brain className="w-6 h-6 text-purple-600" />, color: 'bg-purple-50 border-purple-100', hover: 'hover:border-purple-300' },
                        { id: 'panya-chain', title: 'ปัญญาเชน', sub: 'Credit Bank', desc: 'ระบบสะสมหน่วยกิตดิจิทัล เชื่อมโยงทุกช่วงวัยบน Blockchain', icon: <LinkIcon className="w-6 h-6 text-emerald-600" />, color: 'bg-emerald-50 border-emerald-100', hover: 'hover:border-emerald-300' },
                        { id: 'stats', title: 'สถิติห้องเรียน', sub: 'Analytics', desc: 'วิเคราะห์พัฒนาการผู้เรียนรายบุคคลและภาพรวมห้องเรียน', icon: <BarChart3 className="w-6 h-6 text-orange-600" />, color: 'bg-orange-50 border-orange-100', hover: 'hover:border-orange-300' }
                    ].map((card) => (
                        <div
                            key={card.id}
                            onClick={() => card.id !== 'stats' && setModule(card.id)}
                            className={`group relative p-6 rounded-2xl border ${card.color} ${card.hover} bg-white transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform`}>
                                    {card.icon}
                                </div>
                                {card.id === 'kru-leka' && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full">HOT</span>}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
                            <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">{card.sub}</p>
                            <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-slate-400" /> กิจกรรมล่าสุด
                    </h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px]">
                        {recentActivities.length === 0 ? (
                            <div className="text-center text-slate-400 py-10">ยังไม่มีกิจกรรมใหม่</div>
                        ) : (
                            recentActivities.map((act, idx) => (
                                <div key={idx} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                        act.type === 'ocr' ? 'bg-blue-500' :
                                            act.type === 'plan' ? 'bg-purple-500' : 'bg-emerald-500'
                                    }`}></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{act.text}</p>
                                        <p className="text-xs text-slate-400 mt-1">{act.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Module 2: Kru-Leka (Enhanced OCR & Edit) ---

const KruLekaModule = ({ addActivity }) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [data, setData] = useState([]);
    const [hasErrors, setHasErrors] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // เพิ่มสถานะ Loading

    // Mock initial data generation based on "AI"
    const generateMockData = () => [
        { id: 1, sid: '6701001', name: 'ด.ช. สมชาย ใจดี', mid: 25, final: 28, task: 30, total: 83, grade: '4' },
        { id: 2, sid: '6701002', name: 'ด.ญ. สมหญิง รักเรียน', mid: 20, final: 25, task: 25, total: 70, grade: '3' },
        { id: 3, sid: '6701003', name: 'ด.ช. มานะ พากเพียร', mid: 30, final: 45, task: 40, total: 115, grade: 'ERR' }, // Error
        { id: 4, sid: '6701004', name: 'ด.ญ. วีณา มีสุข', mid: 15, final: 20, task: 15, total: 50, grade: '1.5' },
    ];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setStep(2);
        }
    };

    useEffect(() => {
        if (step === 2) {
            // Simulate TrOCR Processing
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 10) + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setData(generateMockData());
                    setTimeout(() => setStep(3), 800);
                }
                setProcessingProgress(progress);
            }, 200);
            return () => clearInterval(interval);
        }
        // Check for errors whenever data changes
        if (step === 3) {
            const errorFound = data.some(row =>
                parseInt(row.total) > 100 ||
                isNaN(parseInt(row.total)) ||
                (parseInt(row.mid) + parseInt(row.final) + parseInt(row.task) !== parseInt(row.total))
            );
            setHasErrors(errorFound);
        }
    }, [step, data]);

    const handleDataChange = (id, field, value) => {
        const newData = data.map(row => {
            if (row.id === id) {
                const updatedRow = { ...row, [field]: value };
                // Auto-recalculate total if score fields change
                if (['mid', 'final', 'task'].includes(field)) {
                    const m = parseInt(updatedRow.mid) || 0;
                    const f = parseInt(updatedRow.final) || 0;
                    const t = parseInt(updatedRow.task) || 0;
                    updatedRow.total = m + f + t;
                    // Simple Grading Logic
                    if (updatedRow.total >= 80) updatedRow.grade = '4';
                    else if (updatedRow.total >= 70) updatedRow.grade = '3';
                    else if (updatedRow.total >= 60) updatedRow.grade = '2';
                    else if (updatedRow.total >= 50) updatedRow.grade = '1';
                    else updatedRow.grade = '0';
                }
                return updatedRow;
            }
            return row;
        });
        setData(newData);
    };

    // --- ส่วนที่แก้ไข: เชื่อมต่อ Google Sheets ของจริง ---
    const handleSubmit = async () => {
        if (hasErrors) return;
        setIsSaving(true); // เริ่มหมุน

        try {
            if (!APPS_SCRIPT_URL) {
                throw new Error("กรุณาใส่ URL ของ Google Apps Script ที่ด้านบนไฟล์ App.jsx ก่อนครับ");
            }

            // ส่งข้อมูลแถวแรกไป (ตัวอย่าง)
            const studentData = data[0];

            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // สำคัญมาก
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            addActivity({ type: 'ocr', text: `บันทึกเกรดลง Google Sheets สำเร็จ!`, time: 'เมื่อสักครู่' });
            setStep(4);

        } catch (error) {
            alert(`เกิดข้อผิดพลาด: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <FileText className="mr-3 text-blue-600" /> ครูเลขา (Kru-Leka)
                    </h2>
                    <p className="text-slate-500">ระบบอัตโนมัติทางปัญญาสำหรับงานทะเบียนวัดผลและปพ.5</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`h-3 w-3 rounded-full ${step === 1 ? 'bg-blue-600 animate-ping' : 'bg-slate-300'}`}></span>
                    <span className={`h-3 w-3 rounded-full ${step === 2 ? 'bg-blue-600 animate-ping' : 'bg-slate-300'}`}></span>
                    <span className={`h-3 w-3 rounded-full ${step === 3 ? 'bg-blue-600 animate-ping' : 'bg-slate-300'}`}></span>
                    <span className={`h-3 w-3 rounded-full ${step === 4 ? 'bg-green-600' : 'bg-slate-300'}`}></span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
                {step === 1 && (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-full max-w-lg border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-10 hover:bg-blue-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*,.xlsx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="bg-white p-4 rounded-full shadow-sm w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">อัปโหลดไฟล์ ปพ.5 (รูปถ่าย/Excel)</h3>
                            <p className="text-slate-500 text-sm">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                            <p className="text-xs text-slate-400 mt-4">รองรับ JPG, PNG, Excel (Max 10MB)</p>
                        </div>
                        <div className="mt-8 flex gap-4 text-sm text-slate-500">
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> Auto-OCR ภาษาไทย</span>
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-green-500" /> ตรวจสอบความผิดปกติ</span>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="h-full flex flex-col items-center justify-center p-12">
                        <div className="w-full max-w-md space-y-6">
                            <div className="relative w-32 h-40 mx-auto bg-slate-200 rounded-lg overflow-hidden shadow-lg border-2 border-white">
                                {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />}
                                <div className="absolute inset-0 bg-blue-900/20 z-10"></div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-[scan_1.5s_linear_infinite] z-20"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-800">กำลังประมวลผลเอกสาร...</h3>
                                <p className="text-slate-500 text-sm mb-4">AI กำลังแกะลายมือและตรวจสอบข้อมูล</p>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${processingProgress}%` }}></div>
                                </div>
                                <p className="text-xs text-right text-blue-600 font-mono mt-1">{processingProgress}%</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky top-0 z-10">
                            <div>
                                <h3 className="font-bold text-slate-800">ตรวจสอบและแก้ไขข้อมูล</h3>
                                <p className="text-xs text-slate-500">กรุณาตรวจสอบความถูกต้องก่อนส่งเข้าระบบ DMC</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setStep(1)} className="px-4 py-2 text-slate-600 text-sm hover:bg-white rounded-lg border border-transparent hover:border-slate-200">ยกเลิก</button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={hasErrors || isSaving}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold text-white shadow-sm flex items-center transition-all ${
                                        hasErrors || isSaving ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-md'
                                    }`}
                                >
                                    {isSaving ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> กำลังบันทึก...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" /> ยืนยันข้อมูล
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {hasErrors && (
                            <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start animate-pulse">
                                <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                                <div className="text-sm text-red-700">
                                    <span className="font-bold">พบข้อผิดพลาด:</span> ระบบตรวจพบความผิดปกติของคะแนน (คะแนนรวมเกิน 100 หรือผลรวมไม่ถูกต้อง) กรุณาแก้ไขช่องสีแดง
                                </div>
                            </div>
                        )}

                        <div className="p-4 overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                                    <th className="px-4 py-3 rounded-tl-lg">รหัสนักเรียน</th>
                                    <th className="px-4 py-3">ชื่อ-นามสกุล</th>
                                    <th className="px-2 py-3 text-center w-20">กลางภาค<br/><span className="text-[10px]">(30)</span></th>
                                    <th className="px-2 py-3 text-center w-20">ปลายภาค<br/><span className="text-[10px]">(30)</span></th>
                                    <th className="px-2 py-3 text-center w-20">เก็บ/งาน<br/><span className="text-[10px]">(40)</span></th>
                                    <th className="px-2 py-3 text-center w-20">รวม<br/><span className="text-[10px]">(100)</span></th>
                                    <th className="px-4 py-3 text-center w-20">เกรด</th>
                                    <th className="px-4 py-3 rounded-tr-lg">สถานะ</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {data.map((row) => {
                                    const isTotalError = parseInt(row.total) > 100 || (parseInt(row.mid)+parseInt(row.final)+parseInt(row.task) !== parseInt(row.total));
                                    return (
                                        <tr key={row.id} className="hover:bg-slate-50 group">
                                            <td className="px-4 py-2 font-mono text-slate-500">{row.sid}</td>
                                            <td className="px-4 py-2 font-medium text-slate-700">{row.name}</td>
                                            {['mid', 'final', 'task'].map((field) => (
                                                <td key={field} className="px-2 py-2 text-center">
                                                    <input
                                                        type="number"
                                                        value={row[field]}
                                                        onChange={(e) => handleDataChange(row.id, field, e.target.value)}
                                                        className="w-16 p-1 text-center border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-slate-300"
                                                    />
                                                </td>
                                            ))}
                                            <td className="px-2 py-2 text-center">
                                                <div className={`w-16 mx-auto py-1 rounded font-bold ${isTotalError ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
                                                    {row.total}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center font-bold text-blue-600">{row.grade}</td>
                                            <td className="px-4 py-2">
                                                {isTotalError ? (
                                                    <span className="flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit">
                              <AlertTriangle className="w-3 h-3 mr-1" /> ตรวจสอบ
                            </span>
                                                ) : (
                                                    <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
                              <CheckCircle className="w-3 h-3 mr-1" /> ปกติ
                            </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">บันทึกข้อมูลสำเร็จ!</h3>
                        <p className="text-slate-500 mb-6 max-w-md">
                            ข้อมูลถูกส่งไปยังระบบ DMC และบันทึกค่า Hash ลงบน Panya-Chain เรียบร้อยแล้ว
                        </p>
                        <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left max-w-md w-full border border-slate-200">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Transaction ID</span>
                                <span className="font-mono">0x8a...3f9</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>Timestamp</span>
                                <span>{new Date().toLocaleString('th-TH')}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setStep(1)}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all"
                        >
                            ทำรายการต่อ
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Module 3: Kru-Mate (Interactive Lesson Plan) ---

const KruMateModule = ({ addActivity }) => {
    const [formData, setFormData] = useState({
        subject: 'วิทยาศาสตร์',
        level: 'ป.4',
        topic: 'ระบบนิเวศ',
        duration: '1 ชั่วโมง',
        context: '',
        style: 'Visual (เน้นภาพ)',
        focus: 'Creativity (ความคิดสร้างสรรค์)'
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setResult({
                title: `แผนการสอน: ${formData.topic} (${formData.context || 'ทั่วไป'})`,
                content: `**1. ขั้นนำ (Engagement - 10 นาที):**\nครูเปิดภาพ "ระบบนิเวศในท้องถิ่น" (อ้างอิงจากบริบท: ${formData.context || 'ทั่วไป'}) ให้นักเรียนดู แล้วตั้งคำถามกระตุ้นความคิดสร้างสรรค์ว่า "ถ้าสัตว์ตัวนี้หายไป จะเกิดอะไรขึ้นกับเรา?"\n\n**2. ขั้นสอน (Exploration - 30 นาที):**\nให้นักเรียนแบ่งกลุ่มวาดภาพผังมโนทัศน์ (Mind Map) แสดงห่วงโซ่อาหาร โดยเน้นการใช้สีสัน (ตามสไตล์ Visual Learner) และนำเสนอหน้าชั้นเรียน\n\n**3. ขั้นสรุป (Explanation - 20 นาที):**\nครูและนักเรียนร่วมกันสรุปความสัมพันธ์ของสิ่งมีชีวิต และมอบหมายงานให้ไปสำรวจสิ่งมีชีวิตรอบบ้าน`,
                resources: ['รูปภาพระบบนิเวศ', 'กระดาษชาร์ท', 'สีไม้/สีเมจิก']
            });
            setLoading(false);
            addActivity({ type: 'plan', text: `สร้างแผนการสอนวิชา${formData.subject} เรื่อง ${formData.topic}`, time: 'เมื่อสักครู่' });
        }, 2000);
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Sidebar Form */}
            <div className="w-full lg:w-1/3 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center mb-1">
                        <Brain className="mr-3 text-purple-600" /> ครูเมท (Kru-Mate)
                    </h2>
                    <p className="text-slate-500 text-sm">ผู้ช่วย AI ออกแบบการสอน (Generative AI)</p>
                </div>

                <form onSubmit={handleGenerate} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">รายวิชา</label>
                            <select className="input-field" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                                <option>วิทยาศาสตร์</option>
                                <option>คณิตศาสตร์</option>
                                <option>ภาษาไทย</option>
                                <option>สังคมศึกษา</option>
                                <option>ภาษาอังกฤษ</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">ระดับชั้น</label>
                            <select className="input-field" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
                                <option>ป.1 - ป.3</option>
                                <option>ป.4 - ป.6</option>
                                <option>ม.1 - ม.3</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="label">หัวข้อ/ตัวชี้วัด</label>
                        <input type="text" className="input-field" placeholder="เช่น ระบบนิเวศ, เศษส่วน" value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})} required />
                    </div>

                    <div>
                        <label className="label">บริบทท้องถิ่น (Local Context)</label>
                        <textarea className="input-field h-24 resize-none" placeholder="เช่น โรงเรียนติดทะเล, นักเรียนชอบเล่นเกม, พื้นที่เกษตรกรรม" value={formData.context} onChange={e => setFormData({...formData, context: e.target.value})}></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">สไตล์การเรียนรู้</label>
                            <select className="input-field" value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})}>
                                <option>Visual (เน้นภาพ)</option>
                                <option>Auditory (เน้นฟัง/พูด)</option>
                                <option>Kinesthetic (เน้นปฏิบัติ)</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">เน้นทักษะ (Focus)</label>
                            <select className="input-field" value={formData.focus} onChange={e => setFormData({...formData, focus: e.target.value})}>
                                <option>Creativity (สร้างสรรค์)</option>
                                <option>Critical Thinking (วิเคราะห์)</option>
                                <option>Collaboration (ทำงานทีม)</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary bg-purple-600 hover:bg-purple-700 mt-4">
                        {loading ? <span className="flex items-center justify-center"><RefreshCw className="animate-spin mr-2 w-4 h-4"/> กำลังคิด...</span> : 'สร้างแผนการสอน'}
                    </button>
                </form>
            </div>

            {/* Result Area */}
            <div className="w-full lg:w-2/3">
                {result ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden h-full flex flex-col">
                        <div className="bg-purple-50 p-6 border-b border-purple-100 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-purple-900">{result.title}</h3>
                                <div className="flex gap-2 mt-2">
                                    <span className="tag bg-purple-200 text-purple-800">{formData.level}</span>
                                    <span className="tag bg-blue-200 text-blue-800">{formData.style}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-purple-200 rounded-full text-purple-700 transition-colors" title="แก้ไข">
                                    {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                                </button>
                                <button className="p-2 hover:bg-purple-200 rounded-full text-purple-700 transition-colors" title="พิมพ์/PDF">
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 flex-1 overflow-y-auto">
                            {isEditing ? (
                                <textarea
                                    className="w-full h-full p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-mono text-sm leading-relaxed"
                                    value={result.content}
                                    onChange={(e) => setResult({...result, content: e.target.value})}
                                ></textarea>
                            ) : (
                                <div className="prose prose-slate max-w-none whitespace-pre-line leading-relaxed text-slate-700">
                                    {result.content}
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h4 className="font-bold text-slate-800 mb-3 flex items-center"><Database className="w-4 h-4 mr-2" /> สื่อและอุปกรณ์ที่ใช้</h4>
                                <div className="flex flex-wrap gap-2">
                                    {result.resources.map((res, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm border border-slate-200">{res}</span>
                                    ))}
                                    <button className="px-3 py-1 border border-dashed border-slate-300 text-slate-400 rounded-full text-sm hover:border-purple-400 hover:text-purple-500 flex items-center"><Plus className="w-3 h-3 mr-1"/> เพิ่ม</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 p-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Brain className="w-10 h-10 text-purple-200" />
                        </div>
                        <p className="text-lg font-medium">รอข้อมูลเพื่อสร้างสรรค์...</p>
                        <p className="text-sm">AI พร้อมช่วยคุณออกแบบการสอนที่ "ว้าว" กว่าเดิม</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Module 4: Panya-Chain (Credit Bank & Verification) ---

const PanyaChainModule = () => {
    const [activeTab, setActiveTab] = useState('wallet'); // 'wallet' or 'verify'
    const [searchQuery, setSearchQuery] = useState('');
    const [verifyResult, setVerifyResult] = useState(null);
    const [selectedToken, setSelectedToken] = useState(null); // For modal

    const myTokens = [
        { id: '0x7A...1B2', name: 'วิทยาศาสตร์พื้นฐาน ป.4', issuer: 'โรงเรียนบ้านหนองปลาดุก', date: '15 มี.ค. 2026', grade: '4.0', type: 'Subject', hash: '0x8f2a...c4e1' },
        { id: '0x3C...9D4', name: 'Coding for Kids (Python)', issuer: 'สสวท. (Online)', date: '20 ม.ค. 2026', grade: 'Pass', type: 'Micro', hash: '0x1a2b...3c4d' },
        { id: '0x9E...5F6', name: 'ภาษาอังกฤษเพื่อการสื่อสาร', issuer: 'โรงเรียนบ้านหนองปลาดุก', date: '15 มี.ค. 2026', grade: '3.5', type: 'Subject', hash: '0x5e6f...7g8h' },
    ];

    const handleVerify = (e) => {
        e.preventDefault();
        setVerifyResult(null);
        // Simulation
        setTimeout(() => {
            if (searchQuery.length > 5) {
                setVerifyResult({ status: 'valid', owner: 'ด.ช. สมชาย มุ่งมั่น', issuer: 'สพฐ.', time: '2026-03-15 14:30:00' });
            } else {
                setVerifyResult({ status: 'invalid' });
            }
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <LinkIcon className="mr-3 text-emerald-600" /> ปัญญาเชน (Panya-Chain)
                    </h2>
                    <p className="text-slate-500">ธนาคารหน่วยกิตดิจิทัลบนมาตรฐาน Hyperledger Besu</p>
                </div>

                {/* Tab Switcher */}
                <div className="bg-slate-200 p-1 rounded-lg flex text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === 'wallet' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-emerald-700'}`}
                    >
                        กระเป๋าสะสมผลงาน
                    </button>
                    <button
                        onClick={() => setActiveTab('verify')}
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === 'verify' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-emerald-700'}`}
                    >
                        ตรวจสอบวุฒิ (Public)
                    </button>
                </div>
            </div>

            {activeTab === 'wallet' && (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden min-h-[500px]">
                    {/* Digital ID Card */}
                    <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                            <ShieldCheck className="w-40 h-40" />
                        </div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-slate-800/50">
                                สม
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">ด.ช. สมชาย มุ่งมั่น</h3>
                                <p className="text-slate-400 text-sm mt-1 mb-3">Student ID: 6701001</p>
                                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-emerald-400 flex items-center">
                    <Hash className="w-3 h-3 mr-1" /> 0x71C...9A2B
                  </span>
                                    <span className="px-2 py-1 bg-emerald-900/50 border border-emerald-800 rounded text-xs text-emerald-300 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> KYCa Verified
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 min-h-[300px]">
                        <h4 className="font-bold text-slate-700 mb-4 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-emerald-600" /> สินทรัพย์การเรียนรู้ (My Learning Assets)
                        </h4>
                        <div className="grid gap-3">
                            {myTokens.map((token, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedToken(token)}
                                    className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-lg ${token.type === 'Subject' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                            {token.type === 'Subject' ? <BookOpen className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-slate-800">{token.name}</h5>
                                            <p className="text-xs text-slate-500">{token.issuer} • {token.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-slate-800">{token.grade}</span>
                                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">On-Chain</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'verify' && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center text-center">
                    <ShieldCheck className="w-16 h-16 text-emerald-500 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">ระบบตรวจสอบวุฒิการศึกษา</h3>
                    <p className="text-slate-500 mb-8 max-w-md">สำหรับหน่วยงานภายนอก มหาวิทยาลัย หรือนายจ้าง ที่ต้องการตรวจสอบความถูกต้องของเอกสาร</p>

                    <form onSubmit={handleVerify} className="w-full max-w-md relative mb-8">
                        <input
                            type="text"
                            placeholder="ระบุ Token ID หรือ Hash (เช่น 0x7A...)"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                        <button type="submit" className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                            ตรวจสอบ
                        </button>
                    </form>

                    {verifyResult && (
                        <div className={`w-full max-w-md p-4 rounded-xl border ${verifyResult.status === 'valid' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} animate-in zoom-in`}>
                            {verifyResult.status === 'valid' ? (
                                <div className="text-left">
                                    <div className="flex items-center text-green-700 font-bold mb-2">
                                        <CheckCircle className="w-5 h-5 mr-2" /> เอกสารถูกต้อง (Valid)
                                    </div>
                                    <div className="space-y-1 text-sm text-slate-600">
                                        <p><span className="font-semibold">เจ้าของ:</span> {verifyResult.owner}</p>
                                        <p><span className="font-semibold">ออกโดย:</span> {verifyResult.issuer}</p>
                                        <p><span className="font-semibold">ประทับเวลา:</span> {verifyResult.time}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center text-red-700 font-bold">
                                    <X className="w-5 h-5 mr-2" /> ไม่พบข้อมูล หรือรหัสไม่ถูกต้อง
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Token Detail Modal */}
            <Modal
                isOpen={!!selectedToken}
                onClose={() => setSelectedToken(null)}
                title="รายละเอียดสินทรัพย์ดิจิทัล (Asset Details)"
            >
                {selectedToken && (
                    <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                            <h4 className="text-xl font-bold text-slate-800">{selectedToken.name}</h4>
                            <p className="text-slate-500 text-sm">เกรด/ผลลัพธ์: <span className="text-emerald-600 font-bold text-lg">{selectedToken.grade}</span></p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500">Token ID</span>
                                <span className="font-mono text-slate-700">{selectedToken.id}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500">Transaction Hash</span>
                                <span className="font-mono text-blue-600 underline cursor-pointer truncate max-w-[200px]">{selectedToken.hash}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500">Issuer (ผู้มอบ)</span>
                                <span className="text-slate-700">{selectedToken.issuer}</span>
                            </div>
                            <div className="flex justify-between pb-2">
                                <span className="text-slate-500">Date</span>
                                <span className="text-slate-700">{selectedToken.date}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-900 flex justify-center items-center">
                                <Share2 className="w-4 h-4 mr-2" /> แชร์ Credential นี้
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

// --- App Container ---

const BuranakanPanyaApp = () => {
    const [activeModule, setActiveModule] = useState('home');
    const [recentActivities, setRecentActivities] = useState([
        { type: 'ocr', text: 'ส่งเกรดวิชาภาษาไทย (ป.4/1) สำเร็จ', time: '2 ชั่วโมงที่แล้ว' },
        { type: 'plan', text: 'สร้างแผนการสอน "พลังงานทดแทน"', time: '5 ชั่วโมงที่แล้ว' }
    ]);

    const addActivity = (activity) => {
        setRecentActivities([activity, ...recentActivities]);
    };

    return (
        <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
            {activeModule === 'home' && <HomeModule setModule={setActiveModule} recentActivities={recentActivities} />}
            {activeModule === 'kru-leka' && <KruLekaModule addActivity={addActivity} />}
            {activeModule === 'kru-mate' && <KruMateModule addActivity={addActivity} />}
            {activeModule === 'panya-chain' && <PanyaChainModule />}

            <div className="mt-12 text-center border-t border-slate-200 pt-8 mb-8">
                <p className="text-slate-400 text-sm font-medium">© 2026 Buranakan-Panya Project. All Rights Reserved.</p>
                <p className="text-slate-400 text-xs mt-1">Prototype v2.0 (Step 1: Real Database)</p>
            </div>
        </Layout>
    );
};

export default BuranakanPanyaApp;

// --- CSS Utility Classes (Tailwind Abstraction for cleaner JSX) ---
/* .input-field { @apply w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-slate-800 text-sm transition-all; }
.label { @apply block text-sm font-bold text-slate-700 mb-1.5; }
.btn-primary { @apply py-3 px-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95; }
*/