import html_to_pdf from 'html-pdf-node';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

export const createPDF = async (article) => {
    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY hh:mm:ss');
    };

    const escapeHTML = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Generate hashtags HTML
    const hashtagsHTML = article.hashtags.map(tag => `
        <a href="/hashtags/${tag.id}"
            class="badge rounded-pill bg-light text-danger border border-secondary me-2 ml-1">
            ${escapeHTML(tag.name)}
        </a>
    `).join('');

    // Generate category and group links
    const categoryGroupHTML = `
        <strong>
            <a href="/category_group/${article.group_id}"
                class="text-primary text-uppercase">${escapeHTML(article.group_name)}</a>
        </strong> >
        <strong>
            <a href="/category/${article.category_id}"
                class="text-primary text-uppercase">${escapeHTML(article.category_name)}</a>
        </strong>
    `;

    // Generate author link
    const authorHTML = `
        <strong>Author:</strong> <a href="/users/${article.author_id}"
            class="text-primary">${escapeHTML(article.author_name)}</a>
    `;

    // Generate hashtags section
    const hashtagsSection = `
        <div class="mt-3">
            <strong class="me-2">
                <i class="bi bi-tag-fill text-danger me-1"></i> Chủ đề:
            </strong>
            ${hashtagsHTML}
        </div>
    `;

    // Construct the full HTML
    const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHTML(article.title)}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="/statics/styles/global.css">
    <link rel="icon" type="image/x-icon" href="/statics/assets/favicon.ico">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
</head>
<body>
    <div class="mt-4">
        <div class="row ">
            <div class="col-9">
                <div class="mt-3">
                    <span>
                        ${categoryGroupHTML}
                    </span>
                    <span class="float-right text-muted"><strong>Ngày đăng:</strong> ${formatDate(article.published_at)}</span>
                </div>
                <h1 class="mt-3">${escapeHTML(article.title)}</h1>
                <p>${authorHTML}</p>
                <hr>
                <div class="mb-3">
                    <strong>${escapeHTML(article.abstract)}</strong>
                </div>
                <div class="mt-3">
                    <div class="article-content" style="max-width: 100%;">
                        ${article.content}
                    </div>
                </div>
                <hr>
                ${hashtagsSection}
            </div>
        </div>
    </div>
    <div class="mb-4 py-4" style="background-color: white;">
        <div class="pb-4">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 class="text-uppercase text-danger">Báo điện tử Cripsy Chicken Rice</h5>
                    <p>
                        Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh, Việt Nam <br>
                        Điện thoại: (0123) 456-7890 <br>
                        Email: contact@crispychickenrice.vn
                    </p>
                </div>
            </div>
        </div>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2025 Bản quyền thuộc về Báo điện tử Cripsy Chicken Rice
        </div>      
    </div>
</body>
</html>
    `;

    const options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    const file = { content: html };

    const buffer = await html_to_pdf.generatePdf(file, options);

    return buffer;
};
