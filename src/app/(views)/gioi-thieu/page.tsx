import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutUs() {
  return (
    <div className="container mx-auto py-10 px-6 pt-25">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Về Chúng Tôi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-lg leading-relaxed">
            Chào mừng bạn đến với công ty của chúng tôi! Chúng tôi chuyên tư vấn
            và thiết kế các dự án xây dựng tại Việt Nam. Với sự am hiểu sâu sắc
            về văn hóa và kiến trúc địa phương, chúng tôi hướng đến việc tạo ra
            những thiết kế sáng tạo và bền vững, đáp ứng nhu cầu độc đáo của
            từng khách hàng.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Đội ngũ của chúng tôi bao gồm các kiến trúc sư, kỹ sư và chuyên gia
            tư vấn giàu kinh nghiệm, luôn tận tâm mang đến các giải pháp chất
            lượng cao cho các dự án nhà ở, thương mại và công nghiệp. Từ ý tưởng
            đến hoàn thiện, chúng tôi đảm bảo mọi chi tiết đều được lên kế hoạch
            và thực hiện một cách tỉ mỉ.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Sứ mệnh của chúng tôi là cam kết mang lại sự xuất sắc, đổi mới và sự
            hài lòng cho khách hàng. Cảm ơn bạn đã tin tưởng và lựa chọn chúng
            tôi để biến tầm nhìn của bạn thành hiện thực!
          </p>
          <div className="mt-6 flex justify-center">
            <Button variant="default" size="lg">
              Tìm Hiểu Thêm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
