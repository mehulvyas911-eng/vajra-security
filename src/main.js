const { app, BrowserWindow, ipcMain, dialog, safeStorage } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function createWindow() {
  const win = new BrowserWindow({ width: 1440, height: 920, minWidth: 1120, minHeight: 720, backgroundColor: '#071014', webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false } });
  win.loadFile(path.join(__dirname, 'index.html'));
}
app.whenReady().then(() => {
  ipcMain.handle('select-folder', async () => { const r = await dialog.showOpenDialog({ properties: ['openDirectory'] }); return r.canceled ? null : r.filePaths[0]; });
  ipcMain.handle('scan-folder', async (_, folder) => scanFolder(folder));
  ipcMain.handle('quarantine', async (_, item) => ({ ok: false, status: 'approval_required', message: 'Containment is gated in this prototype. Review the evidence and approve in the production response service.' }));
  ipcMain.handle('save-provider', async (_, provider) => { const file = path.join(app.getPath('userData'), 'providers.json'); const data = safeStorage.isEncryptionAvailable() ? safeStorage.encryptString(JSON.stringify(provider)).toString('base64') : JSON.stringify(provider); fs.writeFileSync(file, data); return {ok:true, encrypted:safeStorage.isEncryptionAvailable()}; });
  createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

async function scanFolder(folder) {
  const started = Date.now(); const findings = []; let scanned = 0;
  const suspicious = /(^|[._-])(crack|keygen|payload|dropper|ransom|stealer|loader)([._-]|$)/i;
  async function walk(dir, depth=0) { if (depth > 5) return; let entries=[]; try { entries=fs.readdirSync(dir,{withFileTypes:true}); } catch { return; }
    for (const e of entries) { const full=path.join(dir,e.name); if (e.isDirectory()) { if (!['node_modules','.git','AppData'].includes(e.name)) await walk(full,depth+1); continue; }
      if (scanned >= 2500) return; let stat; try { stat=fs.statSync(full); } catch { continue; } scanned++;
      const hash=crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
      const signals=[]; if (suspicious.test(e.name)) signals.push('suspicious filename heuristic'); if (/\.(ps1|vbs|js|hta|scr|dll|exe|bat|cmd)$/i.test(e.name)) signals.push('executable/script surface'); if (stat.size > 100*1024*1024) signals.push('large binary');
      if (signals.length) findings.push({id:hash.slice(0,12), path:full, sha256:hash, severity: signals.length>1?'high':'medium', signals, action:'review'});
    }
  }
  await walk(folder); return {folder, scanned, findings, elapsedMs:Date.now()-started, engine:'VAJRA local heuristic engine • prototype'};
}
