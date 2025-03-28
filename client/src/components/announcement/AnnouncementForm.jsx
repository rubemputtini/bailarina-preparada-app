import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createAnnouncement } from '../../services/announcementService';
import { announcementCategories } from '../../utils/constants';
import brasil from '../../assets/brasil.png'

dayjs.extend(utc);
dayjs.extend(timezone);
const tz = 'America/Sao_Paulo';

const AnnouncementForm = ({ onPreviewChange, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: dayjs().format('YYYY-MM-DDTHH:mm'),
        publishAt: '',
        expiresAt: '',
        isVisibleNow: true,
        link: '',
        category: 'Aulas'
    });

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        onPreviewChange(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            content: formData.content,
            date: dayjs.tz(formData.date, tz).utc().toISOString(),
            publishAt: formData.isVisibleNow
                ? dayjs().tz(tz).utc().toISOString()
                : formData.publishAt
                    ? dayjs.tz(formData.publishAt, tz).utc().toISOString()
                    : null,
            expiresAt: formData.expiresAt
                ? dayjs.tz(formData.expiresAt, tz).utc().toISOString()
                : null,
            isVisible: formData.isVisibleNow,
            link: formData.link,
            category: formData.category
        };

        const response = await createAnnouncement(payload);

        if (response) {
            const successMsg = payload.publishAt && !formData.isVisibleNow
                ? `Aviso agendado para ${dayjs.utc(payload.publishAt).tz(tz).format('DD/MM/YYYY [às] HH:mm')} de Brasília com sucesso!`
                : 'Aviso criado e publicado com sucesso!';
            onSuccess(successMsg);
            setFormData({
                title: '',
                content: '',
                date: dayjs().format('YYYY-MM-DDTHH:mm'),
                publishAt: '',
                expiresAt: '',
                isVisibleNow: true,
                link: '',
                category: 'Aulas'
            });
            onPreviewChange(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="text-sm text-gray-800 max-w-5xl mx-auto px-4 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Título do aviso"
                    className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                />
                <select
                    className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    required
                >
                    {announcementCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <textarea
                placeholder="Conteúdo do aviso"
                className="border rounded-xl px-4 py-2 w-full resize-none min-h-[70px] focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
            />

            <div className="grid sm:grid-cols-3 gap-4">
                <div>
                    <label className="block font-medium mb-1 items-center">Data do Evento</label>
                    <input
                        type="datetime-local"
                        className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Expira em (opcional)</label>
                    <input
                        type="datetime-local"
                        className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                        value={formData.expiresAt}
                        onChange={(e) => handleChange('expiresAt', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Link (opcional)</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        className="border rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                        value={formData.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 text-xs italic text-gray-500 mt-2 text-center flex-wrap">
                <span>Todos os horários são considerados no fuso de Brasília.</span>
                <img
                    src={brasil}
                    alt="Bandeira do Brasil"
                    title="Horário de Brasília"
                    className="w-4 h-4"
                />
            </div>

            <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📢</span>
                        <div>
                            <p className="font-semibold text-gray-900 whitespace-nowrap">Visibilidade do aviso</p>
                            {!formData.isVisibleNow && (
                                <p className="text-xs text-gray-500 mt-0.5">O aviso será exibido apenas na data agendada.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:justify-end">
                        <span className="text-sm font-medium text-gray-700">Mostrar imediatamente</span>
                        <button
                            type="button"
                            onClick={() => handleChange('isVisibleNow', !formData.isVisibleNow)}
                            className={`w-10 h-6 rounded-full relative transition-all duration-300 ${formData.isVisibleNow ? 'bg-purple-600' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${formData.isVisibleNow ? 'translate-x-4' : ''
                                    }`}
                            ></span>
                        </button>
                        {!formData.isVisibleNow && (
                            <input
                                type="datetime-local"
                                className="border rounded-lg px-3 py-2 w-[180px]"
                                value={formData.publishAt}
                                onChange={(e) => handleChange('publishAt', e.target.value)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 text-white font-bold tracking-wide uppercase px-7 py-3 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                >
                    Criar Aviso
                </button>
            </div>
        </form>
    );
};

export default AnnouncementForm;
