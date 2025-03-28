import { Trash2 } from 'lucide-react';
import { announcementColorsMap } from '../../utils/constants';
import dayjs from 'dayjs';
import LaunchIcon from '@mui/icons-material/Launch';
import { Tooltip, IconButton } from '@mui/material';

const AnnouncementCard = ({
    title,
    content,
    category = 'Outros',
    date,
    link,
    showActions = false,
    isVisible = true,
    onDelete,
    onToggle,
}) => {
    const colorStyle = announcementColorsMap[category] || announcementColorsMap['Outros'];
    const formattedDate = dayjs.utc(date).tz('America/Sao_Paulo').format('DD/MM - HH:mm');

    return (
        <div
            className={`border-l-4 ${colorStyle.tailwind} p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
            <div className="flex items-center justify-between mb-1">
                <p className="flex items-center gap-1 text-sm font-semibold">
                    <span>{colorStyle.icon}</span> {title}
                </p>
                <p className="text-xs text-gray-600">{formattedDate}</p>
            </div>

            <p className="text-sm text-gray-800 mb-1">
                {content}
            </p>

            {link && !showActions && (
                <div className="flex justify-end mt-1">
                    <Tooltip title="Acessar conteúdo" arrow>
                        <IconButton
                            href={link}
                            target="_blank"
                            rel="noopener"
                            size="small"
                            sx={{ padding: 0, color: '#3B82F6' }}
                        >
                            <LaunchIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            )}

            {showActions && (
                <div className="flex justify-end items-center gap-2 mt-2">
                    <button
                        onClick={onDelete}
                        title="Excluir aviso"
                        className="text-gray-500 hover:text-red-500"
                    >
                        <Trash2 size={16} />
                    </button>

                    <button
                        onClick={() => onToggle?.(!isVisible)}
                        title="Visível para usuários"
                        className={`w-9 h-5 rounded-full relative ${isVisible ? 'bg-purple-600' : 'bg-gray-300'}`}
                    >
                        <span
                            className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-white shadow-md transition-transform ${isVisible ? 'translate-x-4' : ''
                                }`}
                        ></span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnnouncementCard;