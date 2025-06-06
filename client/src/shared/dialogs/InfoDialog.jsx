import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import DialogButton from "shared/buttons/DialogButton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const InfoDialog = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 w-[90vw] max-w-md shadow-2xl border border-gray-200">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                >
                    <div className="flex justify-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <InformationCircleIcon className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>

                    <p className="text-md text-gray-700 mb-4">
                        Sua pontuação é comparada com dados de referência de acordo com sua idade e gênero.
                        Isso permite uma avaliação justa e alinhada ao seu perfil.
                    </p>

                    <DialogButton onClick={onClose}>FECHAR</DialogButton>
                </motion.div>
            </Box>
        </Modal>
    );
};

export default InfoDialog;