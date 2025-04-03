import { Typography } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementPreview = ({ data }) => {
    if (!data) {
        return (
            <Typography variant="body2" color="textSecondary">
                Preencha o formulário para visualizar o aviso.
            </Typography>
        );
    }

    return (
        <AnnouncementCard
            title={data.title}
            content={data.content}
            category={data.category}
            date={data.date}
            link={data.link}
        />
    );
};

export default AnnouncementPreview;
