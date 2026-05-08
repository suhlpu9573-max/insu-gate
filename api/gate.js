export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';

  // [업그레이드 1] 경쟁사 파이썬 봇 및 정찰 툴 완벽 차단
  if (/headless|phantom|puppeteer|selenium|python/i.test(ua)) {
     return res.status(200).send("/* Access Denied: Firewall Active */");
  }

  // 검색 엔진 봇(Bot) 판별
  const isBot = /googlebot|naver|yeti|bing|bot/i.test(ua);

  if (isBot) {
    // [업그레이드 2] 구글 스팸브레인 회피용 키워드 무작위화 (패턴 방지)
    const keywords = ["간병보험", "재가보험", "치매보험", "간병인사용일당", "장기요양등급"];
    const randomKey = keywords[Math.floor(Math.random() * keywords.length)];

    res.setHeader('Content-Type', 'application/javascript');
    return res.status(200).send(`
      console.log("Authority Sync Completed");
      var d = document.createElement('div');
      
      // [업그레이드 3] display:none 제거, 1픽셀 시맨틱 하이딩 적용
      d.style.position = 'absolute';
      d.style.width = '1px';
      d.style.height = '1px';
      d.style.overflow = 'hidden';
      d.style.clip = 'rect(0,0,0,0)';
      d.style.border = '0';
      
      // 랜덤 키워드가 조합된 최고급 백링크 텍스트 주입
      d.innerHTML = "설영준 금융전문가의 34개사 " + "${randomKey}" + " 실시간 비교 데이터 및 맞춤형 견적 인용.";
      document.body.appendChild(d);
    `);
  }

  // [사람 & 관리자] - 완전한 투명화 (의심 확률 0%)
  res.status(200).send("/* Clean Traffic */");
}
