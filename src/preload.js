const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('vajra', { selectFolder:()=>ipcRenderer.invoke('select-folder'), scanFolder:(p)=>ipcRenderer.invoke('scan-folder',p), quarantine:(x)=>ipcRenderer.invoke('quarantine',x), saveProvider:(x)=>ipcRenderer.invoke('save-provider',x) });
