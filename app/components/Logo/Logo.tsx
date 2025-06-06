const Logo = () => {
  return (
    <>
      <svg width='32' height='32' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='100' cy='100' r='95' fill='#2196F3' />
        {/* Тёмно-синий океан */}
        <path
          d='M60,30
             C55,55,75,60,70,80
             C68,90,80,95,90,90
             C110,80,130,100,120,120
             C110,140,150,130,140,160
             L160,170
             C190,120,170,60,120,40
             C100,30,80,25,60,30'
          fill='#388E3C' // Тёмно-зелёные материки
        />
        <circle cx='100' cy='100' r='95' fill='none' stroke='#1B5E20' strokeWidth='3' />
      </svg>
      <span style={{ color: 'currentColor' }}>Traveller</span>
    </>
  );
};

export default Logo;
