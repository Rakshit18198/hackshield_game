import * as Colyseus from 'colyseus.js';

let onlinePlayers = {};
let room = null;
let currentScene = null; // Store reference to current scene

// Initialize socket connection
try {
  const client = new Colyseus.Client('ws://localhost:5000');
  room = client.joinOrCreate('poke_world').then(r => {
    console.log(`${r.sessionId} joined poke_world`);

    // ✅ Register listeners immediately when room is ready
    setupRoomListeners(r);

    return r;
  }).catch(e => {
    console.error('Socket join error:', e);
  });
} catch (e) {
  console.error('Socket init error:', e);
}

function setupRoomListeners(roomInstance) {
  roomInstance.onMessage("CURRENT_PLAYERS", (data) => {
    console.log("📥 CURRENT_PLAYERS received:", data);
    if (currentScene) {
      Object.keys(data.players).forEach((sessionId) => {
        const player = data.players[sessionId];
        if (sessionId !== roomInstance.sessionId && !onlinePlayers[sessionId]) {
          console.log("➕ Creating online player:", sessionId);
          const OnlinePlayer = currentScene.OnlinePlayer; // Get class from scene
          onlinePlayers[sessionId] = new OnlinePlayer({
            scene: currentScene,
            playerId: sessionId,
            map: player.map,
            x: player.x,
            y: player.y
          });
        }
      });
    }
  });

  roomInstance.onMessage("PLAYER_JOINED", (data) => {
    console.log("👥 PLAYER_JOINED:", data);
    if (currentScene && !onlinePlayers[data.sessionId]) {
      const OnlinePlayer = currentScene.OnlinePlayer;
      onlinePlayers[data.sessionId] = new OnlinePlayer({
        scene: currentScene,
        playerId: data.sessionId,
        map: data.map,
        x: data.x,
        y: data.y
      });
    }
  });

  roomInstance.onMessage("PLAYER_LEFT", (data) => {
    if (onlinePlayers[data.sessionId]) {
      console.log("❌ PLAYER_LEFT:", data.sessionId);
      onlinePlayers[data.sessionId].destroy();
      delete onlinePlayers[data.sessionId];
    }
  });

  roomInstance.onMessage("PLAYER_MOVED", (data) => {
    if (onlinePlayers[data.sessionId] && currentScene && currentScene.mapName === data.map) {
      if (!onlinePlayers[data.sessionId].scene) {
        const OnlinePlayer = currentScene.OnlinePlayer;
        onlinePlayers[data.sessionId] = new OnlinePlayer({
          scene: currentScene,
          playerId: data.sessionId,
          map: data.map,
          x: data.x,
          y: data.y
        });
      }
      onlinePlayers[data.sessionId].isWalking(data.position, data.x, data.y);
    }
  });

  roomInstance.onMessage("PLAYER_MOVEMENT_ENDED", (data) => {
    if (onlinePlayers[data.sessionId] && currentScene && currentScene.mapName === data.map) {
      if (!onlinePlayers[data.sessionId].scene) {
        const OnlinePlayer = currentScene.OnlinePlayer;
        onlinePlayers[data.sessionId] = new OnlinePlayer({
          scene: currentScene,
          playerId: data.sessionId,
          map: data.map,
          x: data.x,
          y: data.y
        });
      }
      onlinePlayers[data.sessionId].stopWalking(data.position);
    }
  });

  roomInstance.onMessage("PLAYER_CHANGED_MAP", (data) => {
    if (onlinePlayers[data.sessionId]) {
      onlinePlayers[data.sessionId].destroy();
      delete onlinePlayers[data.sessionId];
    }
  });
}

// Function to set current scene reference
function setCurrentScene(scene) {
  currentScene = scene;
}

export { onlinePlayers, room, setCurrentScene };