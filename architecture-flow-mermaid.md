# PDF Summary App – Modern Architecture Flow (Mermaid)

Below is a modern, visual box-and-arrow diagram using Mermaid to represent the high-level flow of the PDF Summary App:

```mermaid
flowchart LR
    subgraph User
        U1["User Uploads PDF"]
        U2["User Views Summary"]
        U3["User Asks Qs"]
    end
    subgraph Frontend
        FE["React App"]
    end
    subgraph Backend
        BE["FastAPI Server"]
        UPLOADS["Uploads Folder"]
        PDFPROC["PDF Processing (PyPDF2)"]
        SUMCACHE["Summary Cache (shelve)"]
        QACACHE["Q&A Cache (in-memory)"]
    end
    subgraph LLM
        OLLAMA["Ollama LLM (Llama2)"]
    end

    U1-->|Upload|FE
    FE-->|REST API|BE
    BE-->|Save PDF|UPLOADS
    BE-->|Process PDF|PDFPROC
    PDFPROC-->|Summarize|OLLAMA
    OLLAMA-->|Summary|SUMCACHE
    SUMCACHE-->|Summary|BE
    BE-->|Summary|FE
    FE-->|Show|U2

    FE-->|Ask Q|BE
    BE-->|Retrieve|QACACHE
    QACACHE-->|Miss|OLLAMA
    OLLAMA-->|Answer|QACACHE
    QACACHE-->|Answer|BE
    BE-->|Answer|FE
    FE-->|Show|U3

    classDef store fill:#f9f,stroke:#333,stroke-width:1px;
    class UPLOADS,SUMCACHE,QACACHE store;
```

**Legend:**
- User interacts with the React frontend (upload, view summary, ask questions)
- Frontend communicates with FastAPI backend
- Backend processes PDF, stores files, manages summary (persistent) and Q&A (in-memory) caches
- Ollama LLM is used for summarization and Q&A
- Results are returned to the user via the frontend

---
For more details, see the rest of this `architecture.md` and the backend `README.md`.
