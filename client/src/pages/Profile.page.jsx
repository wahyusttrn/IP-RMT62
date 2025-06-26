import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TCh2, TCh4 } from '@/components/Typography';
import { Mail, User, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { main_server } from '@/helpers/http-client';
import { useNavigate } from 'react-router';

export default function Profile() {
  const [user, setUser] = useState({
    name: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await main_server.get('/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setUser(data.user);
    };

    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <Card className="w-full max-w-md p-8 flex flex-col items-center gap-6 bg-white border-none shadow-none">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profilePic} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-2">
          <TCh2 className="font-bold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> {user.name}
          </TCh2>
          <TCh4 className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" /> {user.email}
          </TCh4>
          <TCh4 className="flex items-center gap-2 ">
            <Star className="w-4 h-4" /> {user.tier}
          </TCh4>
        </div>
      </Card>
      <Button onClick={handleLogout} className="mt-10" type="button">
        Logout
      </Button>
    </div>
  );
}
