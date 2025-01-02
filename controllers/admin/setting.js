import { getSetting, updateSetting } from '../../models/setting.js';

export const getSettingController = async (req, res) => {
    try {
        const setting = await getSetting();
        var minutes = setting.hours*60;
        if(setting.minutes) {
           minutes += setting.minutes;
        }
        if(setting.seconds) {
            minutes += setting.seconds/60;
        }
        minutes = Math.floor(minutes)
        res.render('admin/setting', {
            title: 'Cài đặt',
            premium_time: parseInt(minutes),
            user: req.session.authUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(' Error while getting setting');
    }
}

export const postSettingController = async (req, res) => {
    try {
        const premium_time = req.body.premiumTime;
        
        await updateSetting(premium_time);
        res.json({ success: true, message: 'Cập nhật thành công' });
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(500).send('Error while updating setting');
    }
}