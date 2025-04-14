import ShareImageCard from "./ShareImageCard";
import DialogButton from "shared/buttons/DialogButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/routes/routes";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

const ShareDialog = ({ open, onClose, category, trainingDaysCount }) => {
    const navigate = useNavigate();
    const { height } = useWindowSize();
    const [scale, setScale] = useState(1);

    const handleClose = () => {
        onClose();
        navigate(ROUTES.dashboard);
    };

    useEffect(() => {
        const originalHeight = 640;
        const maxVisibleHeight = height * 0.75;
        const newScale = maxVisibleHeight / originalHeight;
        setScale(newScale > 1 ? 1 : newScale);
    }, [height]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    overflow: 'hidden',
                    paddingY: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Box sx={{ overflowX: 'hidden', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            maxWidth: '100vw',
                            overflow: 'hidden',
                        }}
                    >
                        <ShareImageCard
                            category={category}
                            trainingDaysCount={trainingDaysCount}
                        />
                        <p className="text-sm text-center text-gray-300 mt-2 break-words max-w-xs">
                            📲 Tire um print da tela para compartilhar nas redes sociais!
                        </p>
                        <DialogButton onClick={handleClose} fullWidthOnMobile={false} variant="secondary">
                            FECHAR
                        </DialogButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ShareDialog;
