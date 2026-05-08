const SUPABASE_URL  = 'https://fczudbtgtpkxteppckwb.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjenVkYnRndHBreHRlcHBja3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzczMzEsImV4cCI6MjA5MzU1MzMzMX0.AZKGqLFVB-VpBsDrg0ekOzX755t5kLfgWZPEJ92ELeU';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn    = document.getElementById('loginBtn');
    const errEl  = document.getElementById('loginError');
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    btn.disabled = true;
    btn.textContent = 'Signing in...';
    errEl.classList.add('hidden');

    const { data, error } = await sb
        .from('mission_users')
        .select('id, username, full_name, mission_id, is_active')
        .eq('username', username)
        .eq('password_hash', password)
        .eq('mission_id', 1)
        .eq('is_active', true)
        .maybeSingle();

    if (error || !data) {
        errEl.textContent = 'Access denied. This portal is for NCMC users only.';
        errEl.classList.remove('hidden');
        btn.disabled = false;
        btn.textContent = 'Login';
        return;
    }

    sessionStorage.setItem('ncmc_user', JSON.stringify(data));
    location.href = 'Pages/Dashboard.html';
});
