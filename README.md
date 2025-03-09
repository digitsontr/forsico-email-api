# Forsico Communication Service

Bu servis, farklı iletişim kanalları üzerinden mesaj gönderimi sağlayan bir API servisidir. Email, notification ve Slack mesajları göndermek için kullanılabilir.

## Özellikler

- Email gönderimi (Microsoft Graph API üzerinden)
- Bildirim gönderimi 
- Slack mesaj gönderimi
- JWT tabanlı kimlik doğrulama
- Azure üzerinde çalışan servis

## Kurulum

### Bağımlılıkları yükleyin
- npm install

### Servisi başlatın
- npm start


## API Endpoints

Tüm endpointler JWT token doğrulaması gerektirir. İsteklerde `Authorization` header'ında Bearer token gönderilmelidir.

### 1. Email Gönderme

**Endpoint:** `POST /api/communication/send-mail`

**Request Body:**
```json
{
    "to": "recipient@example.com",
    "subject": "Email Subject",
    "html": "<p>Email content in HTML format</p>"
}
```

**Başarılı Response:**
```json
{
    "status": "success",
    "message": "Email sent successfully",
    "timestamp": "2025-03-09T14:04:17.754Z"
}
```

**Hata Response:**
```json
{
    "status": false,
    "errors": [
        {
            "message": "Failed to send email",
            "detail": "Detailed error message"
        }
    ]
}
```


### 2. Bildirim Gönderme

**Endpoint:** `POST /api/communication/send-notification`

**Request:** 

```json
{
    "to": "test@example.com",
    "subject": "Test Notification",
    "body": "This is a test notification"
}
```


### 3. Slack Mesaj Gönderme

**Endpoint:** `POST /api/communication/send-slack-message`



## Geliştirme

1. `.env` dosyası oluşturun ve gerekli environment variable'ları ekleyin:

env
JWT_ISSUER=forsicoio.authApi.com
JWT_AUDIENCE=forsicoio.authApi.com
JWT_SECRET_KEY=your_secret_key
SLACK_BOT_TOKEN=your_slack_token



2. Azure portal üzerinden gerekli konfigürasyonları yapın:
   - App Service ayarlarına environment variable'ları ekleyin
   - Microsoft Graph API için gerekli izinleri tanımlayın

## Deployment

Proje GitHub Actions ile Azure App Service'e otomatik deploy edilmektedir. Master branch'e yapılan her push işlemi sonrası deployment tetiklenir.

## Güvenlik

- Tüm endpointler JWT token doğrulaması gerektirir
- Hassas bilgiler (API anahtarları, tokenlar vb.) environment variable'lar üzerinden yönetilir
- HTTPS protokolü kullanılır

## Lisans

Bu proje özel kullanım için geliştirilmiştir. Tüm hakları saklıdır.