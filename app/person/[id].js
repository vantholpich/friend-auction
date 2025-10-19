import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

export default function PersonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerson();
  }, [id]);

  const loadPerson = async () => {
    try {
      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setPerson({
        id: data.id,
        name: data.name,
        age: data.age,
        bio: data.bio,
        startingBid: data.starting_bid,
        image: data.image_url,
      });
    } catch (error) {
      console.error('Error loading person:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async () => {
    try {
      const { error } = await supabase
        .from('bids')
        .insert({
          friend_id: person.id,
          bid_amount: person.startingBid,
          user_id: 'demo-user',
        });

      if (error) throw error;
      router.back();
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  if (loading || !person) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: person.image }} style={styles.headerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{person.name}, {person.age}</Text>
            <Text style={styles.headerLocation}>San Francisco</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {person.name}</Text>
            <Text style={styles.sectionText}>{person.bio}</Text>
          </View>

          {/* Occupation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Occupation</Text>
            <Text style={styles.sectionText}>Creative Designer</Text>
          </View>

          {/* Pros */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pros</Text>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Great sense of humor</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Life of the party</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Always down for adventure</Text>
            </View>
          </View>

          {/* Cons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cons</Text>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Talks too much about crypto</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Can't cook to save their life</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Snores a bit (allegedly)</Text>
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text style={styles.tagIcon}>📷</Text>
                <Text style={styles.tagText}>Photography</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagIcon}>✈️</Text>
                <Text style={styles.tagText}>Travel</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagIcon}>🎵</Text>
                <Text style={styles.tagText}>Music</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagIcon}>🎨</Text>
                <Text style={styles.tagText}>Art</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagIcon}>🍕</Text>
                <Text style={styles.tagText}>Foodie</Text>
              </View>
            </View>
          </View>

          {/* Photo Gallery */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photo Gallery</Text>
            <View style={styles.gallery}>
              <View style={styles.galleryItem}>
                <Image source={{ uri: person.image }} style={styles.galleryImage} />
              </View>
              <View style={styles.galleryItem}>
                <Image source={{ uri: person.image }} style={styles.galleryImage} />
              </View>
              <View style={styles.galleryItem}>
                <Image source={{ uri: person.image }} style={styles.galleryImage} />
              </View>
              <View style={styles.galleryItem}>
                <Image source={{ uri: person.image }} style={styles.galleryImage} />
              </View>
            </View>
          </View>

          {/* Testimonials */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Testimonials</Text>
            <View style={styles.testimonial}>
              <View style={styles.testimonialHeader}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=1' }}
                  style={styles.testimonialAvatar}
                />
                <View>
                  <Text style={styles.testimonialName}>Alex P.</Text>
                  <Text style={styles.testimonialRole}>Friend since 2019</Text>
                </View>
              </View>
              <Text style={styles.testimonialText}>
                "{person.name} is the best friend you could ask for! Always there when you need them."
              </Text>
            </View>
            <View style={styles.testimonial}>
              <View style={styles.testimonialHeader}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
                  style={styles.testimonialAvatar}
                />
                <View>
                  <Text style={styles.testimonialName}>Jessica F.</Text>
                  <Text style={styles.testimonialRole}>Colleague</Text>
                </View>
              </View>
              <Text style={styles.testimonialText}>
                "Super reliable and fun to hang out with. 10/10 would recommend!"
              </Text>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.superBidButton}>
          <Text style={styles.superBidIcon}>⭐</Text>
          <Text style={styles.superBidText}>Super Bid</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageIcon}>💬</Text>
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bidButton} onPress={handleBid}>
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  headerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerLocation: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#E91E63',
    marginRight: 8,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  tagIcon: {
    fontSize: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  galleryItem: {
    width: (width - 50) / 2,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  testimonial: {
    backgroundColor: '#F5F5F0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  testimonialRole: {
    fontSize: 14,
    color: '#666666',
  },
  testimonialText: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  superBidButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  superBidIcon: {
    fontSize: 24,
  },
  superBidText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  messageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageIcon: {
    fontSize: 24,
  },
  messageText: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },
  bidButton: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E91E63',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
