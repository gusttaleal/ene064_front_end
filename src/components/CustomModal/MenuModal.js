import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Switch } from '@material-ui/core';

import { AppButton } from '../AppButton';
import { CustomSubTitle, CustomText, CustomTitle } from '../CustomText';
import { CustomIcon } from '../CustomIcon';

import closeIcon from '../../assets/icons/close_icon.png';

import styles from './MenuModal.module.scss';
import { SuccessAlert } from '../CustomAlert/CustomAlert';

const MenuModal = ({ isOpen, closeModal, submit }) => {
  const [alert, setAlert] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceStatus, setDeviceStatus] = useState(false);

  const handleChangeName = (event) => {
    setDeviceName(event.target.value);
  };

  const handleChangeType = (event) => {
    setDeviceType(event.target.value);
  };

  const handleChangeStatus = () => {
    setDeviceStatus(!deviceStatus);
  };

  const submitHandler = async () => {
    await submit(deviceName, deviceType, deviceStatus);
    setAlert(true);
    setTimeout(() => {
      setDeviceName('');
      setDeviceType('');
      setDeviceStatus(false);
      setAlert(false);
      closeModal();
    }, 1000);
  };

  return (
    <React.Fragment>
      <SuccessAlert isOpen={alert} callback={() => setAlert(false)} text="Dispositivo criado com sucesso!" />
      <Modal className={styles['modal']} open={isOpen} onClose={closeModal}>
        <div className={styles['modal-container']}>
          <div className={styles['icon-container']}>
            <CustomIcon callback={closeModal} icon={closeIcon} alt="Close icon" />
          </div>
          <div className={styles['body']}>
            <CustomTitle>CRIE UM DISPOSITIVO</CustomTitle>

            <CustomSubTitle>Cadastre seu novo dispositivo</CustomSubTitle>

            <CustomText>
              Escolha um nome, preencher o tipo e defina o estado do seu dispositivo, habilitado ou desabilitado.
            </CustomText>

            <TextField
              value={deviceName}
              onChange={handleChangeName}
              fullWidth
              margin="normal"
              label="Nome do dispositivo"
            />

            <TextField
              value={deviceType}
              onChange={handleChangeType}
              fullWidth
              margin="normal"
              label="Tipo do dispositivo"
            />

            <FormControlLabel
              control={<Switch checked={deviceStatus} color="primary" onChange={handleChangeStatus} />}
              className={styles['status-container']}
              label="Estado do dispositivo"
            />

            <AppButton label="CADASTRAR" callback={submitHandler} />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

MenuModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export { MenuModal };
