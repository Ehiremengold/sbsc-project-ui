import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'shared-websocket/src/lib/WebsocketService';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.css'],
})
export class DocumentManagerComponent implements OnInit {
  documents: string[] = ['Document 1', 'Document 2']; // Sample documents
  selectedDocument: string | null = null;
  webSocketService: WebSocketService;

  constructor() {
    this.webSocketService = new WebSocketService('ws://localhost:8080');
  }

  ngOnInit(): void {
    this.webSocketService.getSocket().onmessage = (event: MessageEvent) => {
      console.log('Received WebSocket update:', event.data);
    };
  }

  selectDocument(doc: string) {
    this.selectedDocument = doc;
  }

  addDocument() {
    const newDoc = `Document ${this.documents.length + 1}`;
    this.documents.push(newDoc);
  }

  removeDocument(doc: string) {
    this.documents = this.documents.filter((d) => d !== doc);
  }
}
