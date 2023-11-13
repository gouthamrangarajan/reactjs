import PartySocket from "partysocket";

let partySocket: PartySocket | null = null;
export function sendMessage(message: string) {
  if (partySocket != null) partySocket.send(message);
}
export function receiveMessage(
  callback: (messageEvent: MessageEvent<any>) => void
) {
  if (partySocket != null) partySocket.addEventListener("message", callback);
}
export function removeReceiveMessage(
  callback: (messageEvent: MessageEvent<any>) => void
) {
  if (partySocket != null) partySocket.removeEventListener("message", callback);
}
function connectToParty() {
  partySocket = new PartySocket({
    host: import.meta.env.VITE_PARTYKIT_HOST,
    room: import.meta.env.VITE_PARTYKIT_ROOM,
  });
}
if (partySocket == null) connectToParty();
