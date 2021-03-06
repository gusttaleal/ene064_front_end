import React, { createContext } from 'react';

import { createDeviceOnFirestore } from '../../api/DeviceApi/createDeviceOnFirestore';
import { readDeviceOnFirestore } from '../../api/DeviceApi/readDeviceOnFirestore';
import { updateDeviceOnFirestore } from '../../api/DeviceApi/updateDeviceOnFirestore';
import { deleteDeviceOnFirestore } from '../../api/DeviceApi/deleteDeviceOnFirestore';

import { useAuth } from '../../hooks/useAuth';

const DeviceContext = createContext({});

const DeviceProvider = ({ children }) => {
  const { user } = useAuth();

  const createDevice = async (deviceName, deviceType, deviceStatus) =>
    await createDeviceOnFirestore({
      userId: user.uid,
      deviceName: deviceName,
      deviceType: deviceType,
      deviceStatus: deviceStatus,
    });

  const readDevices = async () => {
    return await readDeviceOnFirestore();
  };

  const updateDevice = async (deviceId, deviceName, deviceType, deviceStatus) =>
    await updateDeviceOnFirestore({
      deviceId: deviceId,
      deviceName: deviceName,
      deviceType: deviceType,
      deviceStatus: deviceStatus,
    });

  const deleteDevice = async (deviceId) =>
    await deleteDeviceOnFirestore({
      deviceId: deviceId,
    });

  return (
    <DeviceContext.Provider value={{ createDevice, readDevices, updateDevice, deleteDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};

export { DeviceContext, DeviceProvider };
